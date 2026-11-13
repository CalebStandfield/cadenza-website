import { useEffect } from "react";

/**
 * Mirrors `id` into the URL hash as the page scrolls. Uses replaceState, so
 * scrolling does not fill the back button history or jump the page.
 */
export function useSyncHash(id: string | null) {
  useEffect(() => {
    if (!id || window.location.hash === `#${id}`) return;
    window.history.replaceState(null, "", `#${id}`);
  }, [id]);
}
