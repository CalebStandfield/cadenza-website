# cadenza-website

Showcase site for Cadenza, a music app that lets you tag songs in your Apple Music library and pull playlists back out with boolean tag queries.

## Stack

Vite + React + TypeScript. Plain CSS, colors mirror the app's theme tokens.

## Scripts

```sh
scripts/dev.sh start     # dev server in the background on :5173 (PORT to override)
scripts/dev.sh stop      # stop it
scripts/dev.sh rebuild   # stop, clean install, build, start
```

Or the usual `npm run dev` / `npm run build`.

## Layout

One page, four sections (About, Download, Team, Tutorial). Text scrolls on the left, a sticky phone on the right shows screens for whatever is in view. Under 900px the sticky phone hides and each section shows its own.

- `src/content/` - all copy and data. Sections, team, tutorial steps, download links. Edit here, not in components.
- `src/screens/` - mock app screens. `index.tsx` maps a screen key to what renders. To use a video instead, point a key's `render` at a `<video>`.
- `src/components/` - phone frame, nav, scroll tracking.
- `src/styles/tokens.css` - colors, mirrored from the app's `client-app/src/lib/theme/tokens.ts`.

## TODO

- Real TestFlight and APK links in `src/content/downloads.ts`.
- Bios, headshots (`public/headshots/`), and links for Kevin, Troy, and David in `src/content/team.ts`.
