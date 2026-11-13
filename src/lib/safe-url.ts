const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

/** `href` when it is an in-page anchor or an http(s) or mailto url, else "#". Blocks javascript:, data:, and the rest. */
export function safeHref(href: string): string {
  if (href.startsWith("#")) return href;
  try {
    return SAFE_PROTOCOLS.has(new URL(href).protocol) ? href : "#";
  } catch {
    return "#";
  }
}

/** True for an http(s) url, which opens in a new tab. */
export function isExternal(href: string): boolean {
  return /^https?:/i.test(href);
}
