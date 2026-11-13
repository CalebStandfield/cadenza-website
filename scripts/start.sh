#!/usr/bin/env bash
#
# Starts the vite dev server in the background.
# Pid goes to .dev.pid, output to .dev.log. PORT defaults to 5173.
#

set -eu

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
PID_FILE="$PROJECT_ROOT/.dev.pid"
LOG_FILE="$PROJECT_ROOT/.dev.log"
PORT="${PORT:-5173}"

cd "$PROJECT_ROOT"

if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "Already running (pid $(cat "$PID_FILE")) on http://localhost:$PORT"
  exit 0
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm ci
fi

nohup npx vite --port "$PORT" --strictPort > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

echo "Started (pid $(cat "$PID_FILE")) on http://localhost:$PORT"
echo "Logs: $LOG_FILE"
