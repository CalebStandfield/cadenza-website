import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { tradeColor, type ColorQueue } from "./color-queue";
import "./nebula.css";

/**
 * Where each blob sits and how big it is, as fractions of the viewport. The
 * app's `full` layout. Ellipses run wider than the screen so no edge shows.
 */
const SLOTS = [
  { x: 0.2, y: 0.1, w: 1.3, h: 0.4 },
  { x: 0.85, y: 0.32, w: 1.2, h: 0.4 },
  { x: 0.15, y: 0.55, w: 1.3, h: 0.42 },
  { x: 0.8, y: 0.77, w: 1.3, h: 0.42 },
  { x: 0.35, y: 0.98, w: 1.4, h: 0.45 },
];

/**
 * Seconds per half cycle of each blob's size, brightness and drift. Different
 * and coprime, so the blobs never line up into a visible loop.
 */
const PERIODS = [
  { size: 11, glow: 7, drift: 17 },
  { size: 13, glow: 9, drift: 19 },
  { size: 15, glow: 8, drift: 23 },
  { size: 17, glow: 11, drift: 29 },
  { size: 19, glow: 10, drift: 31 },
];

/** How long a blob takes to fade out to nothing, and back in a new color. Matches nebula.css. */
const TRADE_FADE_MS = 3500;
/** How long a blob shows one color, picked at random in this range. */
const HOLD_MS = [10_000, 22_000] as const;
/** How long the first trades wait, spread out so they do not all go at once. */
const FIRST_HOLD_MS = [2_000, 14_000] as const;

function between([low, high]: readonly [number, number]) {
  return low + Math.random() * (high - low);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Soft blobs of color glowing behind the whole page, fixed to the viewport,
 * in the style of Apple Music's playlist backdrop. Port of the app's
 * NebulaBackdrop: each blob breathes and drifts (CSS), and every so often
 * fades out, trades its color through a shared queue, and fades back in.
 */
export function NebulaBackdrop({ colors }: { colors: readonly string[] }) {
  const queue = useRef<ColorQueue>(colors);
  const trade = useCallback((current: string) => {
    const next = tradeColor(queue.current, current);
    queue.current = next.queue;
    return next.color;
  }, []);

  return (
    <div className="nebula" aria-hidden="true">
      {SLOTS.map((slot, index) => (
        <Blob key={index} slot={slot} period={PERIODS[index]} startColor={colors[index % colors.length]} trade={trade} />
      ))}
    </div>
  );
}

function Blob({
  slot,
  period,
  startColor,
  trade,
}: {
  slot: (typeof SLOTS)[number];
  period: (typeof PERIODS)[number];
  startColor: string;
  trade: (current: string) => string;
}) {
  const [color, setColor] = useState(startColor);
  const [lit, setLit] = useState(true);
  // random start points, so blobs on similar periods differ
  const [offsets] = useState(() => [Math.random(), Math.random(), Math.random()]);

  // hold, fade out, take the next color, fade back in, forever
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let timer = 0;
    let current = startColor;
    const cycle = (hold: number) => {
      timer = window.setTimeout(() => {
        setLit(false);
        timer = window.setTimeout(() => {
          current = trade(current);
          setColor(current);
          setLit(true);
          cycle(TRADE_FADE_MS + between(HOLD_MS));
        }, TRADE_FADE_MS);
      }, hold);
    };
    cycle(between(FIRST_HOLD_MS));
    return () => window.clearTimeout(timer);
  }, [startColor, trade]);

  const style = {
    left: `${(slot.x - slot.w / 2) * 100}%`,
    top: `${(slot.y - slot.h / 2) * 100}%`,
    width: `${slot.w * 100}%`,
    height: `${slot.h * 100}%`,
    "--blob-color": color,
    "--size-s": `${period.size}s`,
    "--glow-s": `${period.glow}s`,
    "--drift-s": `${period.drift}s`,
    "--size-delay": `${-offsets[0] * period.size}s`,
    "--glow-delay": `${-offsets[1] * period.glow}s`,
    "--drift-delay": `${-offsets[2] * period.drift}s`,
  } as CSSProperties;

  return (
    <div className={lit ? "nebula-blob" : "nebula-blob out"} style={style}>
      <div className="nebula-glow" />
    </div>
  );
}
