import type { ReactNode } from "react";
import { AnalyticsScreen } from "./AnalyticsScreen";
import { ConnectScreen } from "./ConnectScreen";
import { LibraryScreen } from "./LibraryScreen";
import { PlayerScreen } from "./PlayerScreen";
import { QueryScreen } from "./QueryScreen";
import { SocialScreen } from "./SocialScreen";
import { SuggestScreen } from "./SuggestScreen";
import { TagsScreen } from "./TagsScreen";
import "./screens.css";

export type TabName = "social" | "analytics" | "cadenza" | "library" | "search";

/**
 * One thing the phone can show. `render` returns a mock screen now and can
 * return a <video> later, the frame does not care. `tab` is the highlighted
 * tab, or null to hide the tab bar.
 */
export type ScreenDef = {
  tab: TabName | null;
  render: () => ReactNode;
};

export const SCREENS = {
  connect: { tab: null, render: () => <ConnectScreen /> },
  library: { tab: "library", render: () => <LibraryScreen /> },
  tags: { tab: "cadenza", render: () => <TagsScreen /> },
  suggest: { tab: "cadenza", render: () => <SuggestScreen /> },
  query: { tab: "cadenza", render: () => <QueryScreen /> },
  player: { tab: null, render: () => <PlayerScreen /> },
  analytics: { tab: "analytics", render: () => <AnalyticsScreen /> },
  social: { tab: "social", render: () => <SocialScreen /> },
} satisfies Record<string, ScreenDef>;

export type ScreenKey = keyof typeof SCREENS;
