// ─── MongoDB store ────────────────────────────────────────────
// Un único documento appdata/main con todo el contenido del portal.
import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

const COLLECTION = 'appdata';
const DOC_ID     = 'main';

let db = null;

export function collection() {
  if (!db) throw new Error('DB not connected');
  return db.collection(COLLECTION);
}

// Quita datos de acceso que nunca deben guardarse en claro.
function stripSecrets(data) {
  const clean = { ...data };
  delete clean.admin;
  if (Array.isArray(clean.clients)) {
    clean.clients = clean.clients.map(({ password, ...c }) => c);
  }
  return clean;
}

export async function connectDB(uri, dbName, rootDir) {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB');

  const existing = await collection().findOne({ _id: DOC_ID });
  if (!existing) {
    const seedPath = path.join(rootDir, 'data', 'db.json');
    if (fs.existsSync(seedPath)) {
      const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
      await collection().insertOne({ _id: DOC_ID, data: stripSecrets(seed) });
      console.log('DB seeded from data/db.json');
    }
    return;
  }

  // Las contraseñas en claro y el admin del navegador quedaron expuestos
  // (18-oct-2026): se eliminan; el admin fija contraseñas nuevas con hash.
  const admin = await collection().updateOne(
    { _id: DOC_ID, 'data.admin': { $exists: true } },
    { $unset: { 'data.admin': '' } }
  );
  const clients = await collection().updateOne(
    { _id: DOC_ID, 'data.clients.password': { $exists: true } },
    { $unset: { 'data.clients.$[].password': '' } }
  );
  if (admin.modifiedCount || clients.modifiedCount) console.log('Removed plaintext credentials from DB');
}

export async function getData() {
  const doc = await collection().findOne({ _id: DOC_ID });
  return (doc && doc.data) || {};
}

export async function setData(data) {
  await collection().updateOne({ _id: DOC_ID }, { $set: { data } }, { upsert: true });
}

export async function setClientPasswordHash(clientId, hash) {
  const res = await collection().updateOne(
    { _id: DOC_ID },
    { $set: { 'data.clients.$[c].passwordHash': hash } },
    { arrayFilters: [{ 'c.id': clientId }] }
  );
  return res.modifiedCount === 1;
}
