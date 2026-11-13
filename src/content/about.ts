import type { PhoneAnchor } from "./sections";

export type AboutPart = PhoneAnchor & { title: string };

/** The About blocks after the hero. Each is a phone anchor. Bodies live in sections/About.tsx. */
export const ABOUT_PARTS: AboutPart[] = [
  { id: "about-problem", section: "about", screen: "tags", title: "The problem" },
  { id: "about-does", section: "about", screen: "query", title: "What Cadenza does" },
  { id: "about-built", section: "about", screen: "analytics", title: "How it is built" },
];
