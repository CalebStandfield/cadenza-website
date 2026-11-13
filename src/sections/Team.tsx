import { Section } from "../components/Section";
import { TeamMember } from "../components/TeamMember";
import type { SectionDef } from "../content/sections";
import { TEAM } from "../content/team";

export function Team({ section }: { section: SectionDef }) {
  return (
    <Section section={section}>
      <span className="eyebrow">Team</span>
      <h2>Who built it</h2>
      <p className="lead">Four University of Utah CS students. Cadenza is our capstone project.</p>
      <div className="members">
        {TEAM.map((member, i) => (
          <TeamMember key={member.name} member={member} flip={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
