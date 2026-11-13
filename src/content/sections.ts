import type { ScreenKey } from "../screens";

export type PhoneAnchor = {
  id: string;
  /** What the phone shows while this anchor is in view. */
  screen: ScreenKey;
  /** The section this anchor sits inside, when it is nested. */
  section?: string;
};

/** How the phone is turned, in degrees. Negative ry turns the screen toward the text on the left. */
export type PhonePose = { rx: number; ry: number; rz: number };

export type SectionDef = PhoneAnchor & {
  label: string;
  /** The angle the phone settles at while this section is in view. */
  pose: PhonePose;
};

export const SECTIONS: readonly SectionDef[] = [
  {
    id: "about",
    label: "About",
    screen: "library",
    pose: { rx: 8, ry: -18, rz: 2 },
  },
  { id: "download", label: "Download", screen: "connect", pose: { rx: 4, ry: -10, rz: -1 } },
  { id: "team", label: "Team", screen: "social", pose: { rx: 12, ry: -14, rz: 3 } },
  {
    id: "tutorial",
    label: "Tutorial",
    screen: "query",
    pose: { rx: 5, ry: -24, rz: 1 },
  },
];
