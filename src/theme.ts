/**
 * Brand colors needed from TS. Mirrors client-app/src/lib/theme/tokens.ts.
 * Everything else lives as CSS variables in styles/tokens.css.
 */

/** The two ends of the Apple Music icon's gradient, bottom to top. */
export const APPLE_MUSIC_GRADIENT = ["#fa233b", "#fb5c74"] as const;

/** A color and how often it is picked, relative to the others. */
export type WeightedColor = { color: string; weight: number };

/** A color given to at least one in every `every` glows, on top of the weighted picks. */
export type ReservedColor = { color: string; every: number };

/** The page nebula: mostly Apple Music reds, with spots of purple and blue. */
export const PAGE_NEBULA: readonly WeightedColor[] = [
  { color: APPLE_MUSIC_GRADIENT[0], weight: 5 },
  { color: APPLE_MUSIC_GRADIENT[1], weight: 4 },
  { color: "#6466b8", weight: 1 },
  { color: "#9b5de5", weight: 1 },
];

/** The nebula's blue, held for at least one in seven glows so it always shows. */
export const PAGE_NEBULA_BLUE: ReservedColor = { color: "#6466b8", every: 7 };
