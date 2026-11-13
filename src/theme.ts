/**
 * Brand colors needed from TS. Mirrors client-app/src/lib/theme/tokens.ts.
 * Everything else lives as CSS variables in styles/tokens.css.
 */

/** The two ends of the Apple Music icon's gradient, bottom to top. */
export const APPLE_MUSIC_GRADIENT = ["#fa233b", "#fb5c74"] as const;

/** The nebula behind every Apple Music page: its reds, and a blue. */
export const APPLE_MUSIC_NEBULA = [...APPLE_MUSIC_GRADIENT, "#6466b8"] as const;
