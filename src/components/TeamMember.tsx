import { memberAnchorId } from "../content/anchors";
import type { TeamMember as Member } from "../content/team";
import { isExternal, safeHref } from "../lib/safe-url";
import { Icon, type IconName } from "./Icon";

/** One plain address, no spaces or ?cc= style extras riding along in the mailto. */
const EMAIL = /^[^\s@?&#]+@[^\s@?&#]+$/;

const LINKS: { key: keyof Member["links"]; label: string; icon: IconName }[] = [
  { key: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { key: "github", label: "GitHub", icon: "github" },
  { key: "portfolio", label: "Portfolio", icon: "globe" },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Headshot on one side, bio on the other. `flip` puts the photo on the right. */
export function TeamMember({ member, flip }: { member: Member; flip: boolean }) {
  const mailto = EMAIL.test(member.email) ? `mailto:${member.email}` : "#";

  return (
    <article id={memberAnchorId(member)} className={flip ? "member flip" : "member"}>
      <div className="member-photo">
        {member.headshot ? (
          <img src={member.headshot} alt={member.name} />
        ) : (
          <span className="member-initials" style={{ background: member.color }}>
            {initials(member.name)}
          </span>
        )}
      </div>
      <div className="member-body">
        <h3>{member.name}</h3>
        <span className="member-role">{member.role}</span>
        {member.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <div className="member-links">
          <a href={mailto} className="icon-link" aria-label={`Email ${member.name}`}>
            <Icon name="mail" size={18} />
          </a>
          {LINKS.map((link) => {
            const href = safeHref(member.links[link.key]);
            const external = isExternal(href);
            return (
              <a
                key={link.key}
                href={href}
                className="icon-link"
                aria-label={`${member.name} on ${link.label}`}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Icon name={link.icon} size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}
