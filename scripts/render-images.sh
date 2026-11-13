#!/usr/bin/env bash
#
# Renders the PNG icons and the social card in public/ with headless Chrome.
# Rerun after changing the logo or the card. macOS Chrome path by default,
# override with CHROME=/path/to/chrome.
#

set -eu

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
PUBLIC="$PROJECT_ROOT/public"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# the note from public/cadenza-logo.svg, centered in an 800 box
NOTE='<g transform="translate(137.709940 47.483446)" fill="#c4a7e7"><rect x="206" y="48" width="80" height="485.914171"/><ellipse cx="155.784060" cy="555.009537" rx="134" ry="97" transform="rotate(-20 155.784060 555.009537)"/><path transform="translate(11.012 0)" d="M296 48h56l136 135-58 58-134-134V48Z" fill="#f6c177"/></g>'

# render <name> <width> <height> <body html>
render() {
  local name="$1" width="$2" height="$3" body="$4"
  cat > "$WORK/$name.html" <<HTML
<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:${width}px;height:${height}px;overflow:hidden;background:#0a0a0a;
font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;color:#fafafa}
</style></head><body>$body</body></html>
HTML
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size="$width,$height" --screenshot="$PUBLIC/$name.png" "file://$WORK/$name.html" 2>/dev/null
  echo "wrote public/$name.png"
}

# full bleed tile with the note at `scale` of the box. iOS and Android round the corners themselves.
icon() {
  local name="$1" size="$2" scale="$3"
  render "$name" "$size" "$size" "<svg width=\"$size\" height=\"$size\" viewBox=\"0 0 800 800\"><rect width=\"800\" height=\"800\" fill=\"#171717\"/><g transform=\"translate(400 400) scale($scale) translate(-400 -400)\">$NOTE</g></svg>"
}

icon apple-touch-icon 180 0.78
icon icon-192 192 0.78
icon icon-512 512 0.78
# maskable icons keep the art inside the middle 80 percent
icon icon-maskable-512 512 0.62

render og-image 1200 630 "
<div style=\"position:absolute;inset:0;background:
  radial-gradient(60% 80% at 85% 20%, rgba(250,35,59,.45), transparent 70%),
  radial-gradient(50% 70% at 70% 95%, rgba(251,92,116,.35), transparent 70%),
  radial-gradient(40% 60% at 100% 60%, rgba(155,93,229,.35), transparent 70%),
  radial-gradient(50% 60% at 10% 110%, rgba(100,102,184,.25), transparent 70%)\"></div>
<div style=\"position:absolute;left:90px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:28px;width:780px\">
  <div style=\"display:flex;align-items:center;gap:22px\">
    <svg width=\"96\" height=\"96\" viewBox=\"0 0 800 800\"><rect width=\"800\" height=\"800\" rx=\"180\" fill=\"#171717\"/><g transform=\"translate(400 400) scale(.8) translate(-400 -400)\">$NOTE</g></svg>
    <span style=\"font-size:56px;font-weight:800;letter-spacing:-.02em\">Cadenza</span>
  </div>
  <div style=\"font-size:76px;font-weight:800;line-height:1.05;letter-spacing:-.03em\">Your library,<br><span style=\"background:linear-gradient(90deg,#ff6467,#c4a7e7);-webkit-background-clip:text;color:transparent\">tagged your way.</span></div>
  <div style=\"font-size:30px;color:#c8c8c8;line-height:1.35\">Tag your Apple Music songs. Pull playlists back out with drag and drop tag queries.</div>
</div>"
