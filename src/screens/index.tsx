import type { ReactNode } from "react";

export type TabName = "social" | "analytics" | "cadenza" | "library" | "search";

/**
 * One thing the phone can show. `render` can return a mock screen now and a
 * <video> later, the frame does not care. `tab` is the highlighted tab, or
 * null to hide the tab bar.
 */
export type ScreenDef = {
  tab: TabName | null;
  render: () => ReactNode;
};

export const SCREENS = {
  home: { tab: "cadenza", render: () => null },
} satisfies Record<string, ScreenDef>;

export type ScreenKey = keyof typeof SCREENS;
