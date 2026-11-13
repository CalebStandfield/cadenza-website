import { useMemo, useState, type CSSProperties } from "react";
import type { ReservedColor, WeightedColor } from "../../theme";
import { pickWeighted, seededRandom } from "./random";
import { useRegionGrid } from "./useRegionGrid";
import "./nebula.css";

/** Target region size. More regions on bigger screens. */
const CELL_PX = 380;
/** Glow diameter as a multiple of its region, so neighbors overlap and fill the dark. */
const SIZE = [2.05, 2.7] as const;
/** How far a glow may wander from its region's center, as a fraction of the region. */
const WANDER = 0.22;
/** Seconds for one full wander loop. Long, so motion is barely there. */
const LOOP_S = [150, 300] as const;
/** Seconds for one swell of a glow's brightness. */
const BREATH_S = [18, 40] as const;

type Glow = {
  key: string;
  style: CSSProperties;
};

function between(random: () => number, [low, high]: readonly [number, number]) {
  return low + random() * (high - low);
}

/**
 * Cells that get the reserved color: one in every `every`, spread at random.
 * Shuffles the cells with the visit seed and takes every `every`th.
 */
function reservedCells(count: number, every: number, visitSeed: number): Set<number> {
  const random = seededRandom(visitSeed);
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return new Set(order.filter((_, rank) => rank % every === 0));
}

/** One glow per region. Seeded by region and visit, so a resize keeps the glows it already had. */
function makeGlows(
  cols: number,
  rows: number,
  colors: readonly WeightedColor[],
  reserved: ReservedColor | undefined,
  visitSeed: number,
): Glow[] {
  const held = reserved ? reservedCells(cols * rows, reserved.every, visitSeed) : new Set<number>();
  const cellW = 100 / cols; // vw
  const cellH = 100 / rows; // vh
  const glows: Glow[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const random = seededRandom(visitSeed ^ (row * 7919 + col * 104729));
      const wander = (cell: number) => (random() * 2 - 1) * WANDER * cell;
      const size = between(random, SIZE);
      const loop = between(random, LOOP_S);
      const breath = between(random, BREATH_S);

      glows.push({
        key: `${col}-${row}`,
        style: {
          left: `${(col + 0.5) * cellW}vw`,
          top: `${(row + 0.5) * cellH}vh`,
          width: `${size * cellW}vw`,
          height: `${size * cellH}vh`,
          "--glow-color": reserved && held.has(row * cols + col) ? reserved.color : pickWeighted(colors, random()).color,
          "--loop-s": `${loop}s`,
          "--breath-s": `${breath}s`,
          "--loop-delay": `${-random() * loop}s`,
          "--breath-delay": `${-random() * breath}s`,
          "--x1": `${wander(cellW)}vw`,
          "--y1": `${wander(cellH)}vh`,
          "--x2": `${wander(cellW)}vw`,
          "--y2": `${wander(cellH)}vh`,
          "--x3": `${wander(cellW)}vw`,
          "--y3": `${wander(cellH)}vh`,
        } as CSSProperties,
      });
    }
  }
  return glows;
}

/**
 * A calm nebula behind the whole page, fixed to the viewport. The screen is
 * split into regions, more on bigger screens, and each region holds one large
 * glow that wanders a slow loop around its own center and gently swells.
 * Glows overlap their neighbors so little of the page stays dark. Colors are
 * picked by weight, and `reserved` takes at least one in every `every` glows.
 * Random per visit. Holds still under reduced motion.
 */
export function NebulaBackdrop({ colors, reserved }: { colors: readonly WeightedColor[]; reserved?: ReservedColor }) {
  const { cols, rows } = useRegionGrid(CELL_PX);
  const [visitSeed] = useState(() => Math.floor(Math.random() * 2 ** 31));
  const glows = useMemo(() => makeGlows(cols, rows, colors, reserved, visitSeed), [cols, rows, colors, reserved, visitSeed]);

  return (
    <div className="nebula" aria-hidden="true">
      {glows.map((glow) => (
        <span key={glow.key} className="nebula-glow" style={glow.style} />
      ))}
    </div>
  );
}
