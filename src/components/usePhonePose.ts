import { useEffect, type RefObject } from "react";
import type { PhonePose } from "../content/sections";

type PoseStop = { id: string; pose: PhonePose };

/** Share of a section the phone holds its pose before easing toward the next. */
const HOLD = 0.45;
/** Fraction of the remaining distance covered each frame. Lower is calmer. */
const SMOOTHING = 0.05;
const KEYS = ["rx", "ry", "rz"] as const;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}

/** The pose for the current scroll: held through each section, eased into the next. */
function scrollPose(stops: readonly PoseStop[]): PhonePose {
  const middle = window.scrollY + window.innerHeight / 2;
  const tops = stops.map((stop) => {
    const element = document.getElementById(stop.id);
    return element ? element.getBoundingClientRect().top + window.scrollY : 0;
  });

  let at = 0;
  while (at + 1 < stops.length && tops[at + 1] <= middle) at++;
  if (at + 1 >= stops.length) return stops[at].pose;

  const progress = clamp01((middle - tops[at]) / (tops[at + 1] - tops[at]));
  const t = smoothstep(clamp01((progress - HOLD) / (1 - HOLD)));
  const from = stops[at].pose;
  const to = stops[at + 1].pose;
  return {
    rx: from.rx + (to.rx - from.rx) * t,
    ry: from.ry + (to.ry - from.ry) * t,
    rz: from.rz + (to.rz - from.rz) * t,
  };
}

/**
 * Turns the phone inside `target` as the page scrolls, by writing --rx, --ry
 * and --rz (unitless degrees) onto it. Each frame moves part of the way to the
 * scroll's pose, so it glides rather than tracks. Runs only while moving.
 * Leaves the CSS default pose under reduced motion.
 */
export function usePhonePose(target: RefObject<HTMLElement | null>, stops: readonly PoseStop[]) {
  useEffect(() => {
    const element = target.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const current = scrollPose(stops);
    let frame = 0;

    const write = () => {
      for (const key of KEYS) element.style.setProperty(`--${key}`, current[key].toFixed(3));
    };

    const tick = () => {
      const goal = scrollPose(stops);
      let moving = false;
      for (const key of KEYS) {
        const gap = goal[key] - current[key];
        current[key] += gap * SMOOTHING;
        if (Math.abs(gap) > 0.01) moving = true;
      }
      write();
      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    write();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, [target, stops]);
}
