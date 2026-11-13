import { useState, type CSSProperties } from "react";
import "./nebula.css";

/** How many glows, laid out on a jittered grid so they spread evenly. */
const COLS = 6;
const ROWS = 5;

/** Diameter range, in vmax, so the field looks the same on any screen. */
const SIZE_VMAX = [10, 34] as const;
/** Seconds for one leg of a glow's wander. Long, so motion is barely there. */
const DRIFT_S = [80, 160] as const;
/** Seconds for one swell of a glow's brightness. */
const BREATH_S = [18, 40] as const;
/** How far a glow wanders from its home, in vw / vh. */
const WANDER = 9;

type Glow = {
  x: number;
  y: number;
  size: number;
  color: string;
  drift: number;
  breath: number;
  /** Two waypoints, as offsets from home. */
  path: [number, number, number, number];
  delay: number;
};

function between([low, high]: readonly [number, number]) {
  return low + Math.random() * (high - low);
}

function makeGlows(colors: readonly string[]): Glow[] {
  const glows: Glow[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const wander = () => (Math.random() * 2 - 1) * WANDER;
      glows.push({
        x: ((col + Math.random()) / COLS) * 110 - 5,
        y: ((row + Math.random()) / ROWS) * 110 - 5,
        size: between(SIZE_VMAX),
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: between(DRIFT_S),
        breath: between(BREATH_S),
        path: [wander(), wander(), wander(), wander()],
        delay: Math.random(),
      });
    }
  }
  return glows;
}

/**
 * A calm field of soft glows behind the whole page, fixed to the viewport, in
 * the app's Apple Music nebula colors. Each glow wanders a slow loop of its
 * own and gently swells, so the page is never quite still. The layout is
 * random per visit. Holds still under reduced motion.
 */
export function NebulaBackdrop({ colors }: { colors: readonly string[] }) {
  const [glows] = useState(() => makeGlows(colors));

  return (
    <div className="nebula" aria-hidden="true">
      {glows.map((glow, i) => (
        <span
          key={i}
          className="nebula-glow"
          style={
            {
              left: `${glow.x}%`,
              top: `${glow.y}%`,
              width: `${glow.size}vmax`,
              height: `${glow.size}vmax`,
              "--glow-color": glow.color,
              "--drift-s": `${glow.drift}s`,
              "--breath-s": `${glow.breath}s`,
              "--drift-delay": `${-glow.delay * glow.drift * 3}s`,
              "--breath-delay": `${-glow.delay * glow.breath}s`,
              "--x1": `${glow.path[0]}vw`,
              "--y1": `${glow.path[1]}vh`,
              "--x2": `${glow.path[2]}vw`,
              "--y2": `${glow.path[3]}vh`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
