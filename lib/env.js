// Load .env in development (se importa antes que el resto de módulos).
import fs from 'fs';

if (process.env.NODE_ENV !== 'production') {
  try {
    fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
      const [k, ...v] = line.split('=');
      if (k && v.length && process.env[k.trim()] === undefined) {
        process.env[k.trim()] = v.join('=').trim();
      }
    });
  } catch (_) {}
}
