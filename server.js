const express    = require('express');
const path       = require('path');
const fs         = require('fs');
const { MongoClient } = require('mongodb');

// Load .env in development
if (process.env.NODE_ENV !== 'production') {
  try {
    require('fs').readFileSync('.env', 'utf8').split('\n').forEach(line => {
      const [k, ...v] = line.split('=');
      if (k && v.length) process.env[k.trim()] = v.join('=').trim();
    });
  } catch (_) {}
}

const app  = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'src');

const MONGODB_URI  = process.env.MONGODB_URI;
const DB_NAME      = 'quantumfm';
const COLLECTION   = 'appdata';
const DOC_ID       = 'main';

// ─── MongoDB connection ───────────────────────────────────────
let db = null;

async function connectDB() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log('Connected to MongoDB Atlas');

  // Seed if collection is empty
  const existing = await db.collection(COLLECTION).findOne({ _id: DOC_ID });
  if (!existing) {
    const seedPath = path.join(__dirname, 'data', 'db.json');
    if (fs.existsSync(seedPath)) {
      const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
      await db.collection(COLLECTION).insertOne({ _id: DOC_ID, data: seed });
      console.log('DB seeded from data/db.json');
    }
  }
}

connectDB().catch(err => {
  console.error('MongoDB connection failed:', err.message);
});

// ─── Admin credentials (set via env vars on Heroku) ──────────
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'quantum2026';

// Logout: always returns 401 so the browser discards cached credentials
app.get('/admin/logout', (req, res) => {
  res.set('WWW-Authenticate', 'Basic realm="Quantum FPM Admin"');
  res.status(401).send(
    '<!DOCTYPE html><html><head>' +
    '<meta http-equiv="refresh" content="1;url=/">' +
    '</head><body style="font-family:sans-serif;padding:2rem">' +
    'Signing out&hellip;</body></html>'
  );
});

// Protect all /admin routes with HTTP Basic Auth
app.use('/admin', function (req, res, next) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Basic ')) {
    const decoded = Buffer.from(auth.slice(6), 'base64').toString();
    const sep = decoded.indexOf(':');
    const u = decoded.slice(0, sep);
    const p = decoded.slice(sep + 1);
    if (u === ADMIN_USER && p === ADMIN_PASS) return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Quantum FPM Admin"');
  return res.status(401).send('Admin access required.');
});

// ─── Security headers ────────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none';"
  );
  next();
});

// ─── API ─────────────────────────────────────────────────────
app.use(express.json({ limit: '5mb' }));

app.get('/api/data', async (req, res) => {
  try {
    const doc = await db.collection(COLLECTION).findOne({ _id: DOC_ID });
    res.json(doc ? doc.data : {});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }
    await db.collection(COLLECTION).updateOne(
      { _id: DOC_ID },
      { $set: { data: req.body } },
      { upsert: true }
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Static files ─────────────────────────────────────────────
app.use(express.static(ROOT, { dotfiles: 'allow' }));

app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Quantum Florida Management running on port ${PORT}`);
});
