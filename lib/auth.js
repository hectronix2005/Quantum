// ─── Autenticación (Auth.js) ──────────────────────────────────
// Admin: Google, solo correos verificados de ADMIN_EMAILS (configuración).
// Clientes: correo + contraseña con hash bcrypt, captcha Turnstile y
// límite de intentos (en server.js).
import bcrypt from 'bcryptjs';
import Google from '@auth/express/providers/google';
import Credentials from '@auth/express/providers/credentials';
import { getSession } from '@auth/express';
import { getData } from './store.js';

// Hash de relleno: si el correo no existe se compara igual, para que el
// tiempo de respuesta no delate qué correos son clientes.
const DUMMY_HASH = bcrypt.hashSync('dummy-password-for-timing', 12);

function adminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Sin clave solo se permite fuera de producción.
    return process.env.NODE_ENV !== 'production';
  }
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set('remoteip', ip);
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body
    });
    const json = await r.json();
    return json.success === true;
  } catch (e) {
    console.error('Turnstile verify failed:', e.message);
    return false;
  }
}

async function authorizeClient(credentials, request) {
  const { email, password } = credentials;
  if (typeof email !== 'string' || typeof password !== 'string') return null;
  if (email.length > 254 || password.length < 1 || password.length > 128) return null;

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  if (!(await verifyTurnstile(credentials['cf-turnstile-response'], ip))) return null;

  const data = await getData();
  const wanted = email.trim().toLowerCase();
  const client = (data.clients || []).find(
    c => typeof c.email === 'string' && c.email.toLowerCase() === wanted
  );
  const ok = await bcrypt.compare(password, (client && client.passwordHash) || DUMMY_HASH);
  if (!client || !client.passwordHash || !ok || client.status !== 'active') return null;

  return { id: client.id, name: client.name, email: client.email, role: 'client', clientId: client.id };
}

export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
  pages: { signIn: '/login/', error: '/login/' },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    Credentials({
      credentials: { email: {}, password: {}, 'cf-turnstile-response': {} },
      authorize: authorizeClient
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account && account.provider === 'google') {
        // Se comprueba en el servidor: correo verificado y en la lista.
        return !!(profile && profile.email_verified === true &&
          typeof profile.email === 'string' &&
          adminEmails().includes(profile.email.toLowerCase()));
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && account.provider === 'google') {
        token.role = 'admin';
      } else if (user && user.role === 'client') {
        token.role = 'client';
        token.clientId = user.clientId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.clientId = token.clientId;
      return session;
    }
  }
};

async function sessionFor(req) {
  try {
    return await getSession(req, authConfig);
  } catch (e) {
    console.error('getSession failed:', e.message);
    return null;
  }
}

export function requireRole(role) {
  return async (req, res, next) => {
    const session = await sessionFor(req);
    if (!session || !session.user || session.user.role !== role) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Un admin fuera de la lista (quitado después de entrar) pierde acceso.
    if (role === 'admin' && !adminEmails().includes(String(session.user.email).toLowerCase())) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.locals.session = session;
    next();
  };
}
