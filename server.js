const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'src');
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// ─── Persistence layer ───────────────────────────────────────
let store = null;

function loadStore() {
  try {
    if (fs.existsSync(DB_PATH)) {
      store = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      console.log('DB loaded from data/db.json');
    }
  } catch (e) {
    console.error('Failed to load db.json:', e.message);
    store = null;
  }
}

function saveStore(data) {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Failed to write db.json:', e.message);
  }
  store = data;
}

loadStore();

// ─── API ─────────────────────────────────────────────────────
app.use(express.json({ limit: '5mb' }));

// GET  /api/data  — return current data (empty object if nothing seeded yet)
app.get('/api/data', (req, res) => {
  res.json(store || {});
});

// POST /api/data  — save data to memory + disk
app.post('/api/data', (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  saveStore(req.body);
  res.json({ ok: true });
});

// ─── Static files ─────────────────────────────────────────────
app.use(express.static(ROOT));

app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Quantum Florida Management running on port ${PORT}`);
});
