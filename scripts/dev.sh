#!/usr/bin/env bash
#
# Runs the vite dev server in the background.
#   dev.sh start     start it. Pid goes to .dev.pid, output to .dev.log. PORT defaults to 5173.
#   dev.sh stop      stop it
#   dev.sh rebuild   stop, clean install, production build, start
#

set -eu

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
PID_FILE="$PROJECT_ROOT/.dev.pid"
LOG_FILE="$PROJECT_ROOT/.dev.log"
PORT="${PORT:-5173}"

cd "$PROJECT_ROOT"

start() {
  if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo "Already running (pid $(cat "$PID_FILE")) on http://localhost:$PORT"
    return
  fi

  if [ ! -d node_modules ]; then
    echo "Installing dependencies..."
    npm ci
  fi

  nohup npx vite --port "$PORT" --strictPort > "$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"

  echo "Started (pid $(cat "$PID_FILE")) on http://localhost:$PORT"
  echo "Logs: $LOG_FILE"
}

stop() {
  if [ ! -f "$PID_FILE" ]; then
    echo "Not running."
    return
  fi

  local pid
  pid="$(cat "$PID_FILE")"
  if kill -0 "$pid" 2>/dev/null; then
    kill "$pid"
    echo "Stopped (pid $pid)."
  else
    echo "Stale pid file, nothing to stop."
  fi
  rm -f "$PID_FILE"
}

rebuild() {
  stop
  rm -rf dist node_modules/.vite node_modules/.tmp
  npm ci
  npm run build
  start
}

case "${1:-}" in
  start) start ;;
  stop) stop ;;
  rebuild) rebuild ;;
  *)
    echo "Usage: $0 {start|stop|rebuild}" >&2
    exit 2
    ;;
esac
