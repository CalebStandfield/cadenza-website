import { useEffect, useState } from "react";

/**
 * Id of the anchor crossing the middle of the viewport. When several cross
 * at once (a step inside a section), the one latest in `ids` wins, so list
 * nested anchors after their parents.
 */
export function useActiveAnchor(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const latest = [...ids].reverse().find((id) => visible.has(id));
        if (latest) setActive(latest);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
