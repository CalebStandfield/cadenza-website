import type { IconName } from "../components/Icon";

export type Download = {
  platform: string;
  channel: string;
  icon: IconName;
  href: string;
  action: string;
  note: string;
  steps: string[];
};

/** Mock links until real builds ship. Swap `href` for the TestFlight invite and the apk url. */
export const DOWNLOADS: Download[] = [
  {
    platform: "iOS",
    channel: "TestFlight beta",
    icon: "apple",
    href: "#",
    action: "Join on TestFlight",
    note: "iOS 17 or later",
    steps: ["Install TestFlight from the App Store.", "Open the invite link on your iPhone.", "Tap Install, then open Cadenza."],
  },
  {
    platform: "Android",
    channel: "APK",
    icon: "android",
    href: "#",
    action: "Download APK",
    note: "Android 10 or later",
    steps: ["Download the apk on your phone.", "Allow installs from your browser when asked.", "Open the file and tap Install."],
  },
];
