import type { PhoneAnchor } from "./sections";

export type TutorialStep = PhoneAnchor & {
  title: string;
  body: string;
};

/** Each step is also a phone anchor: the phone shows its screens while it is in view. */
export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "step-connect",
    section: "tutorial",
    screens: ["connect"],
    title: "Connect Apple Music",
    body: "Sign in, then link your Apple Music account. Cadenza reads your library and plays songs through Apple Music, so nothing moves or gets copied.",
  },
  {
    id: "step-tag",
    section: "tutorial",
    screens: ["suggest", "tags"],
    title: "Tag your songs",
    body: "Open any song and add tags. Make your own, like Focus or Road Trip, or give a tag a value, like Energy 8. Suggested tags come from an LLM, so one tap tags a song you have not gotten to yet.",
  },
  {
    id: "step-query",
    section: "tutorial",
    screens: ["query"],
    title: "Build a query",
    body: "On the Cadenza tab, drag tags into and, or, and not groups. Results update as you build, and pull from every song Cadenza knows, not only your library.",
  },
  {
    id: "step-play",
    section: "tutorial",
    screens: ["player", "library"],
    title: "Play it or save it",
    body: "Play the results right away, or save the query as a playlist. It stays live, so a song you tag later shows up on its own.",
  },
  {
    id: "step-analytics",
    section: "tutorial",
    screens: ["analytics", "social"],
    title: "See what you listen to",
    body: "Every play and skip is logged. The Analytics tab shows your plays over time and your top artists, albums, and tags. Social shows what your friends are playing.",
  },
];
