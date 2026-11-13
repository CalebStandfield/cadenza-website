#!/usr/bin/env bash
#
# Stops the dev server started by start.sh.
#

set -eu

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
PID_FILE="$PROJECT_ROOT/.dev.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "Not running."
  exit 0
fi

PID="$(cat "$PID_FILE")"
if kill -0 "$PID" 2>/dev/null; then
  kill "$PID"
  echo "Stopped (pid $PID)."
else
  echo "Stale pid file, nothing to stop."
fi
rm -f "$PID_FILE"
