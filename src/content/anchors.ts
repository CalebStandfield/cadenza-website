import { ABOUT_PARTS } from "./about";
import { SECTIONS, type PhoneAnchor } from "./sections";
import { TEAM, type TeamMember } from "./team";
import { TUTORIAL_STEPS } from "./tutorial";
import type { ScreenKey } from "../screens";

/** What the phone shows beside each team member, in order. */
const TEAM_SCREENS: readonly ScreenKey[] = ["social", "player", "library", "suggest"];

/** DOM id of a team member's card. */
export function memberAnchorId(member: TeamMember): string {
  return `team-${member.name.split(" ")[0].toLowerCase()}`;
}

/**
 * Every place on the page that sets the phone's screen. Sections first, then
 * the anchors nested in them, so a nested one wins while it is in view.
 */
export const ANCHORS: readonly PhoneAnchor[] = [
  ...SECTIONS,
  ...ABOUT_PARTS,
  ...TEAM.map((member, i) => ({
    id: memberAnchorId(member),
    section: "team",
    screen: TEAM_SCREENS[i % TEAM_SCREENS.length],
  })),
  ...TUTORIAL_STEPS,
];
