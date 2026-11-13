#!/usr/bin/env bash
#
# Stops the server, does a clean install and production build, then starts it again.
#

set -eu

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"

"$SCRIPT_DIR/stop.sh"

cd "$PROJECT_ROOT"
rm -rf dist node_modules/.vite node_modules/.tmp
npm ci
npm run build

"$SCRIPT_DIR/start.sh"
