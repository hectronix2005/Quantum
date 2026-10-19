import './lib/env.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { ExpressAuth } from '@auth/express';
import { authConfig } from './lib/auth.js';
import { apiRouter } from './lib/api.js';
import { connectDB } from './lib/store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app  = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.BIND_HOST || '0.0.0.0';
const ROOT = path.join(__dirname, 'src');

const MONGODB_URI  = process.env.MONGODB_URI;
const DB_NAME      = process.env.DB_NAME || 'quantumfm';

for (const key of ['MONGODB_URI', 'AUTH_SECRET']) {
  if (!process.env[key]) {
    console.error(`Missing required env var ${key}`);
    process.exit(1);
  }
}

// Un salto de proxy (Heroku router o Tailscale Funnel): req.ip y req.protocol reales.
app.set('trust proxy', 1);
app.disable('x-powered-by');

// ─── MongoDB connection ───────────────────────────────────────
connectDB(MONGODB_URI, DB_NAME, __dirname).catch(err => {
  console.error('MongoDB connection failed:', err.message);
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
    "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self'; " +
    "frame-src https://challenges.cloudflare.com; " +
    "frame-ancestors 'none';"
  );
  next();
});

// ─── Rate limits ─────────────────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (req, res) => res.redirect(303, '/login/?error=TooManyAttempts')
});
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: 'draft-7', legacyHeaders: false });
const apiLimiter  = rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false });

app.post('/auth/callback/credentials', loginLimiter);
app.use('/auth', authLimiter, ExpressAuth(authConfig));

// ─── API ─────────────────────────────────────────────────────
app.use('/api', apiLimiter, apiRouter());

// ─── Static files ─────────────────────────────────────────────
app.use(express.static(ROOT, { dotfiles: 'allow' }));

app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Quantum Florida Management running on ${HOST}:${PORT}`);
});
