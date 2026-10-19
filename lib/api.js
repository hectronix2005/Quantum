// ─── API ──────────────────────────────────────────────────────
import express from 'express';
import bcrypt from 'bcryptjs';
import { requireRole } from './auth.js';
import { getData, setData, setClientPasswordHash } from './store.js';

const ID_RE        = /^[\w-]{1,64}$/;
const LIST_KEYS    = ['properties', 'financials', 'updates'];
const CLIENT_KEYS  = ['id', 'name', 'email', 'phone', 'status'];
const MAX_STRING   = 20000;
const MAX_IMAGE    = 4 * 1024 * 1024;
const MAX_ITEMS    = 5000;

function isScalar(v) {
  return v === null || typeof v === 'number' || typeof v === 'boolean' ||
    (typeof v === 'string' && v.length <= MAX_STRING);
}

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

// Objeto plano con valores escalares y claves sin operadores de Mongo.
function isFlatRecord(v) {
  if (!isPlainObject(v)) return false;
  return Object.entries(v).every(([k, val]) =>
    k.length <= 64 && !k.startsWith('$') && !k.includes('.') && isScalar(val));
}

function isRecordList(list) {
  return Array.isArray(list) && list.length <= MAX_ITEMS &&
    list.every(item => isFlatRecord(item) && typeof item.id === 'string' && ID_RE.test(item.id));
}

// Valida lo que envía el admin y conserva los hashes de contraseña.
function sanitizeAdminPayload(body, current) {
  if (!isPlainObject(body)) return null;
  const out = {};

  if (!isRecordList(body.clients || [])) return null;
  const hashes = new Map((current.clients || []).map(c => [c.id, c.passwordHash]));
  const emails = new Set();
  out.clients = [];
  for (const c of body.clients || []) {
    const clean = {};
    for (const k of CLIENT_KEYS) if (c[k] !== undefined) clean[k] = c[k];
    if (typeof clean.email !== 'string' || clean.email.length > 254) return null;
    const lower = clean.email.trim().toLowerCase();
    if (emails.has(lower)) return null;
    emails.add(lower);
    if (hashes.get(c.id)) clean.passwordHash = hashes.get(c.id);
    out.clients.push(clean);
  }

  for (const key of LIST_KEYS) {
    const list = body[key] || [];
    if (!isRecordList(list)) return null;
    out[key] = list;
  }

  const site = body.siteContent || {};
  if (!isFlatRecord(site)) return null;
  out.siteContent = site;

  const images = body.images || {};
  if (!isPlainObject(images)) return null;
  for (const [k, v] of Object.entries(images)) {
    if (k.length > 64 || k.startsWith('$') || k.includes('.') ||
        typeof v !== 'string' || v.length > MAX_IMAGE) return null;
  }
  out.images = images;
  return out;
}

function publicClient(c) {
  const { passwordHash, password, ...rest } = c;
  return { ...rest, hasPassword: !!passwordHash };
}

// CSRF: las escrituras solo se aceptan desde el mismo origen.
function sameOrigin(req, res, next) {
  const origin = req.get('origin');
  const expected = `${req.protocol}://${req.get('host')}`;
  if (origin !== expected) return res.status(403).json({ error: 'Forbidden' });
  next();
}

function handle(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (e) {
      console.error(`${req.method} ${req.path}:`, e.message);
      res.status(500).json({ error: 'Internal error' });
    }
  };
}

export function apiRouter() {
  const router = express.Router();
  router.use(express.json({ limit: '5mb' }));

  // Público: solo el contenido de la web.
  router.get('/data', handle(async (req, res) => {
    const data = await getData();
    res.json({ siteContent: data.siteContent || {} });
  }));

  router.get('/config', (req, res) => {
    res.json({ turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || '' });
  });

  // ─── Admin ──────────────────────────────────────────────────
  router.get('/admin/data', requireRole('admin'), handle(async (req, res) => {
    const data = await getData();
    res.json({
      clients:     (data.clients || []).map(publicClient),
      properties:  data.properties || [],
      financials:  data.financials || [],
      updates:     data.updates || [],
      siteContent: data.siteContent || {},
      images:      data.images || {}
    });
  }));

  router.put('/admin/data', sameOrigin, requireRole('admin'), handle(async (req, res) => {
    const current = await getData();
    const clean = sanitizeAdminPayload(req.body, current);
    if (!clean) return res.status(400).json({ error: 'Invalid payload' });
    await setData(clean);
    res.json({ ok: true });
  }));

  router.post('/admin/clients/:id/password', sameOrigin, requireRole('admin'), handle(async (req, res) => {
    const id = req.params.id;
    const password = req.body && req.body.password;
    if (!ID_RE.test(id)) return res.status(400).json({ error: 'Invalid client' });
    if (typeof password !== 'string' || password.length < 10 || password.length > 128) {
      return res.status(400).json({ error: 'Password must be 10-128 characters' });
    }
    const hash = await bcrypt.hash(password, 12);
    const ok = await setClientPasswordHash(id, hash);
    if (!ok) return res.status(404).json({ error: 'Client not found' });
    res.json({ ok: true });
  }));

  // ─── Cliente: solo lo suyo ──────────────────────────────────
  router.get('/client/data', requireRole('client'), handle(async (req, res) => {
    const data = await getData();
    const clientId = res.locals.session.user.clientId;
    const client = (data.clients || []).find(c => c.id === clientId);
    if (!client || client.status !== 'active') return res.status(401).json({ error: 'Unauthorized' });

    const properties = (data.properties || []).filter(p => p.clientId === clientId);
    const propIds = new Set(properties.map(p => p.id));
    res.json({
      client: { id: client.id, name: client.name, email: client.email, phone: client.phone },
      properties,
      financials: (data.financials || []).filter(f => propIds.has(f.propertyId)),
      updates:    (data.updates || []).filter(u => propIds.has(u.propertyId))
    });
  }));

  return router;
}
