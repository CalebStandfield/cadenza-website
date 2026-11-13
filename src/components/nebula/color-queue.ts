/**
 * A line of colors that blobs hand back and take from in turn, so colors move
 * around between them over time. Port of client-app/src/lib/color-queue.ts.
 */
export type ColorQueue = readonly string[];

/**
 * Hands `current` back to the end of the line and takes the first color in it
 * that is not `current`, so a trade always changes color when it can.
 * Returns the new line and the color taken.
 */
export function tradeColor(queue: ColorQueue, current: string): { queue: ColorQueue; color: string } {
  const line = [...queue, current];
  const at = line.findIndex((color) => color !== current);
  if (at === -1) return { queue, color: current };
  return {
    queue: [...line.slice(0, at), ...line.slice(at + 1)],
    color: line[at],
  };
}
