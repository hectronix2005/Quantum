# shellcheck shell=bash
# Funciones compartidas por bin/deploy y bin/rollback (Quantum Florida Management).
#
# Producción: ubuntu, servicio systemd de usuario «quantum-fm», código en ~/services/quantum-fm
# (clon de GitHub), variables en ~/services/quantum-fm.env, público por el Funnel
# https://qfm.tail0be41e.ts.net. Las etiquetas de versión son vAAAA.MM.DD-N.

QFM_DIR="${QFM_DIR:-$HOME/services/quantum-fm}"
QFM_ENV="${QFM_ENV:-$HOME/services/quantum-fm.env}"
QFM_UNIT="${QFM_UNIT:-quantum-fm}"
QFM_STATE="${QFM_STATE:-$HOME/.local/state/quantum-fm}"
QFM_SONDA_INTENTOS="${QFM_SONDA_INTENTOS:-30}"   # × 2 s
QFM_PATRON_ETIQUETA='v[0-9][0-9][0-9][0-9].[0-9][0-9].[0-9][0-9]-*'
BANDEJA="${QFM_BANDEJA:-$HOME/RubymineProjects/Ultron/monitor/bandeja.sh}"
BUZON="${QFM_BUZON:-$HOME/RubymineProjects/Ultron/monitor/carta-a-tmux.sh}"
QFM_AVISOS="${QFM_AVISOS:-1}"   # 0 = sin cartas ni push (pruebas)

info()  { printf '[%s] %s\n' "$(date '+%F %T')" "$*"; }
aviso() { printf '[%s] AVISO: %s\n' "$(date '+%F %T')" "$*" >&2; }
error() { printf '[%s] ERROR: %s\n' "$(date '+%F %T')" "$*" >&2; }

g() { git -C "$QFM_DIR" "$@"; }

# Lee una variable del fichero de entorno sin cargarlo entero (tiene secretos).
leer_env() { grep -m1 "^$1=" "$QFM_ENV" 2>/dev/null | cut -d= -f2- | tr -d '"'"'"; }

url_sonda() {
  local host port
  host="$(leer_env BIND_HOST)"; port="$(leer_env PORT)"
  [[ -z "$host" || "$host" == "0.0.0.0" ]] && host=127.0.0.1
  printf 'http://%s:%s/up' "$host" "${port:-3000}"
}

# Etiquetas de versión, de la más antigua a la más reciente.
etiquetas() { g tag -l "$QFM_PATRON_ETIQUETA" | sort -V; }

# Etiqueta más reciente que apunta a un commit (vacío si ninguna).
etiqueta_de() {
  local commit; commit="$(g rev-parse "$1^{commit}" 2>/dev/null)" || return 0
  g tag -l "$QFM_PATRON_ETIQUETA" --points-at "$commit" | sort -V | tail -n1
}

traer_etiquetas() {
  timeout 60 git -C "$QFM_DIR" fetch -q origin --tags 2>/dev/null \
    || aviso "no se pudo traer de origin (se usan las etiquetas locales)"
}

siguiente_etiqueta() {
  local hoy n
  hoy="v$(date +%Y.%m.%d)"
  n="$(g tag -l "$hoy-*" | sed "s/^$hoy-//" | grep -E '^[0-9]+$' | sort -n | tail -n1)"
  printf '%s-%s' "$hoy" "$(( ${n:-0} + 1 ))"
}

# etiquetar <commit> <mensaje> [release]: crea la etiqueta anotada, la sube y, si se pide,
# la Release de GitHub. Nunca falla (solo avisa): el despliegue no depende de esto.
etiquetar() {
  local commit="$1" msg="$2" release="${3:-}" tag
  tag="$(siguiente_etiqueta)"
  if ! g tag -a "$tag" -m "$msg" "$commit" 2>/dev/null; then
    aviso "no se pudo crear la etiqueta $tag"; return 0
  fi
  info "etiqueta $tag → $(g rev-parse --short "$commit")"
  if ! timeout 60 git -C "$QFM_DIR" push -q origin "refs/tags/$tag" 2>/dev/null; then
    aviso "la etiqueta $tag queda solo en $QFM_DIR (no se pudo subir a origin)"; return 0
  fi
  if [[ -n "$release" ]] && command -v gh >/dev/null 2>&1; then
    (cd "$QFM_DIR" && timeout 60 gh release create "$tag" --verify-tag --generate-notes \
       --title "$tag" >/dev/null 2>&1 9>&-) \
      && info "Release de GitHub $tag creada" \
      || aviso "no se pudo crear la Release de GitHub (la etiqueta sí está)"
  fi
  ETIQUETA_CREADA="$tag"
}

# Instala dependencias solo si package-lock.json cambió respecto a lo instalado.
dependencias() {
  local sello="$QFM_DIR/node_modules/.qfm-lock-sha" sha
  sha="$(sha256sum "$QFM_DIR/package-lock.json" | cut -d' ' -f1)"
  if [[ -f "$sello" && "$(cat "$sello")" == "$sha" ]]; then
    info "dependencias sin cambios"; return 0
  fi
  info "npm ci --omit=dev"
  # npm ci borra node_modules: se guarda una copia (enlaces duros) por si falla, para no dejar
  # al proceso en marcha sin dependencias en disco.
  rm -rf "$QFM_DIR/node_modules.prev"
  [[ -d "$QFM_DIR/node_modules" ]] && cp -al "$QFM_DIR/node_modules" "$QFM_DIR/node_modules.prev"
  if ! (cd "$QFM_DIR" && npm ci --omit=dev --no-audit --no-fund --prefer-offline --loglevel=error); then
    rm -rf "$QFM_DIR/node_modules"
    [[ -d "$QFM_DIR/node_modules.prev" ]] && mv "$QFM_DIR/node_modules.prev" "$QFM_DIR/node_modules"
    error "npm ci falló; se dejan las dependencias anteriores"
    return 1
  fi
  rm -rf "$QFM_DIR/node_modules.prev"
  mkdir -p "$QFM_DIR/node_modules" && printf '%s\n' "$sha" > "$sello" || true
}

reiniciar() { systemctl --user restart "$QFM_UNIT"; }

# sonda <commit esperado>: espera un 200 en /up. Si la respuesta trae «revision» (versiones con
# /up propio) exige que sea la esperada; las versiones antiguas responden 200 con el HTML.
sonda() {
  local esperado url cuerpo i
  esperado="$(g rev-parse "$1^{commit}")"
  url="$(url_sonda)"
  for ((i = 1; i <= QFM_SONDA_INTENTOS; i++)); do
    if cuerpo="$(curl -fsS --max-time 5 "$url" 2>/dev/null)"; then
      if [[ "$cuerpo" == *'"revision"'* && "$cuerpo" != *"$esperado"* ]]; then
        :   # aún responde el proceso anterior
      else
        info "sonda OK ($url)"; return 0
      fi
    fi
    sleep 2
  done
  error "sonda en rojo tras $((QFM_SONDA_INTENTOS * 2)) s: $url → ${cuerpo:-sin respuesta}"
  return 1
}

# avisar <título> <detalle>: carta a Ultron (bandeja; si no llega, el buzón que el Air recoge
# cada minuto) y, si ninguna sale, push al móvil por el Air. Nunca falla ni bloquea.
avisar() {
  local titulo="$1" detalle="$2" carta
  info "aviso: $titulo"
  [[ "$QFM_AVISOS" == 0 ]] && return 0
  carta="$(printf '%s\n\n%s\n\n(%s, %s)\n' "$titulo" "$detalle" "$(hostname -s)" "$(date '+%F %T')")"
  if [[ -f "$BANDEJA" ]] && printf '%s\n' "$carta" \
       | timeout 30 bash "$BANDEJA" dejar-en air Ultron - >/dev/null 2>&1 9>&-; then
    return 0
  fi
  if [[ -f "$BUZON" ]] && printf '%s\n' "$carta" | timeout 10 bash "$BUZON" "$titulo" - >/dev/null 2>&1 9>&-; then
    return 0
  fi
  timeout 20 ssh -o BatchMode=yes -o ConnectTimeout=5 air \
    python3 RubymineProjects/Ultron/web/wt_push.py --tag rollback \
    "$(printf '%q' "$titulo")" "$(printf '%q' "$detalle")" >/dev/null 2>&1 9>&- \
    || aviso "no se pudo avisar a la flota (sigue el trabajo)"
  return 0
}

# Candado para que no corran dos despliegues/rollbacks a la vez.
candado() {
  # Heredado de bin/deploy (que llama a bin/rollback): vale solo si el descriptor sigue abierto.
  [[ -n "${QFM_CANDADO:-}" ]] && { : >&9; } 2>/dev/null && return 0
  mkdir -p "$QFM_STATE"
  exec 9>"$QFM_STATE/despliegue.lock"
  flock -n 9 || { error "ya hay un despliegue o rollback en marcha"; exit 1; }
  export QFM_CANDADO=1
}
