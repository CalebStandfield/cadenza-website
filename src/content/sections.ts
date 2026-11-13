import type { ScreenKey } from "../screens";

export type PhoneAnchor = {
  id: string;
  /** What the phone cycles through while this anchor is in view. */
  screens: readonly ScreenKey[];
  /** The section this anchor sits inside, when it is nested. */
  section?: string;
};

export type SectionDef = PhoneAnchor & { label: string };

export const SECTIONS: readonly SectionDef[] = [
  { id: "about", label: "About", screens: ["home"] },
  { id: "download", label: "Download", screens: ["home"] },
  { id: "team", label: "Team", screens: ["home"] },
  { id: "tutorial", label: "Tutorial", screens: ["home"] },
];
