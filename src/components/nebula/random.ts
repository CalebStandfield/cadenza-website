/** Small seeded random, so one cell always gets the same glow. mulberry32. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Picks one item, each as likely as its weight. `random` is 0 to 1. */
export function pickWeighted<T extends { weight: number }>(items: readonly T[], random: number): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let left = random * total;
  for (const item of items) {
    left -= item.weight;
    if (left < 0) return item;
  }
  return items[items.length - 1];
}
