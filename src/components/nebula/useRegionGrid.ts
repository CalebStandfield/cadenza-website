import { useEffect, useState } from "react";

export type RegionGrid = { cols: number; rows: number };

function measure(cellPx: number): RegionGrid {
  return {
    cols: Math.max(1, Math.round(window.innerWidth / cellPx)),
    rows: Math.max(1, Math.round(window.innerHeight / cellPx)),
  };
}

/**
 * Splits the viewport into regions about `cellPx` on a side, so a bigger
 * screen gets more of them. Updates on resize, only when the count changes.
 */
export function useRegionGrid(cellPx: number): RegionGrid {
  const [grid, setGrid] = useState(() => measure(cellPx));

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = measure(cellPx);
        setGrid((prev) => (prev.cols === next.cols && prev.rows === next.rows ? prev : next));
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [cellPx]);

  return grid;
}
