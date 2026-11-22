# Quantum Florida Management

Web de gestión de propiedades (Node + Express, Auth.js, MongoDB Atlas, un único documento `appdata/main`).

## Producción

- **Dónde:** ubuntu, servicio systemd de usuario `quantum-fm` (`systemctl --user status quantum-fm`), código en
  `~/services/quantum-fm` (clon de GitHub), variables en `~/services/quantum-fm.env` (600, con secretos: no
  imprimir). Escucha en `BIND_HOST:PORT` del env (100.89.116.66:3061) y sale por el Funnel
  https://qfm.tail0be41e.ts.net.
- **Despliegue:** a mano, `bin/deploy` (desde cualquier copia del repo en ubuntu; opera sobre
  `~/services/quantum-fm`). Unir a `main` **no** despliega solo.
- **Sonda:** `GET /up` → `200 {"status":"ok","revision":"<sha>"}`; `503` si la base no está conectada.
- **Base:** sin migraciones. Copia semanal cifrada a Drive: `~/services/quantum-fm-backup.sh`.

## Versiones y rollback

- **Etiquetas:** `bin/deploy`, tras la sonda en verde, crea la etiqueta anotada `vAAAA.MM.DD-N` sobre el commit
  desplegado, la sube y crea la Release de GitHub (`gh release create --generate-notes`). Si la versión que ya
  corría no tenía etiqueta, la etiqueta antes de desplegar para poder volver a ella. Si falla el etiquetado, el
  despliegue no falla (solo avisa).
- **Artefacto:** la etiqueta git (el rollback hace checkout de ese commit en `~/services/quantum-fm` y `npm ci`
  si cambió `package-lock.json`). No hay imágenes Docker.
- **Copia de la base:** el despliegue no la hace porque no hay migraciones; la copia es la semanal de arriba.
- `bin/rollback --seco` — dice qué versión corre y a cuál volvería, y comprueba que existe. No toca nada.
- `bin/rollback` — vuelve a la versión anterior a la desplegada; `bin/rollback v2026.11.22-1` a esa versión.
  Reinicia el servicio, pasa la sonda y avisa a Ultron (bandeja → buzón → push al móvil; si la flota no
  responde, sigue igual).
- **Automático:** si la sonda falla tras `bin/deploy`, este llama una vez a `bin/rollback` con la versión previa
  y termina con error.
- Tras un rollback, `~/services/quantum-fm` queda en HEAD separado; el próximo `bin/deploy` vuelve a `main`.
- **Qué NO hace:** no restaura la base. Si entre las dos versiones hay migraciones (`migrations/`, `db/migrate/`),
  se para y lo dice: eso lo decide Héctor.
