import { useEffect, useState } from "react";

/**
 * Index into a list of `length` items that advances every `intervalMs`.
 * Restarts at 0 whenever `resetKey` changes.
 */
export function useCycle(length: number, intervalMs: number, resetKey: string): number {
  const [state, setState] = useState({ key: resetKey, index: 0 });
  const index = state.key === resetKey ? state.index : 0;

  useEffect(() => {
    if (length < 2) return;
    const timer = window.setInterval(() => {
      setState((prev) => ({
        key: resetKey,
        index: prev.key === resetKey ? (prev.index + 1) % length : 1 % length,
      }));
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [length, intervalMs, resetKey]);

  return index;
}
