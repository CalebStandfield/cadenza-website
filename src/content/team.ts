export type TeamLinks = {
  linkedin: string;
  github: string;
  portfolio: string;
};

export type TeamMember = {
  name: string;
  role: string;
  /** Path under public/, or null to show initials. */
  headshot: string | null;
  /** Avatar color behind the initials. */
  color: string;
  /** Paragraphs, 150 to 250 words total. */
  bio: string[];
  email: string;
  links: TeamLinks;
};

const STUB_LINKS: TeamLinks = { linkedin: "#", github: "#", portfolio: "#" };

/** Placeholder bio for members who have not sent theirs yet. */
function stubBio(first: string): string[] {
  return [
    `${first} is a Computer Science student at the University of Utah and a developer on Cadenza, our capstone project. Bio coming soon: degree and graduation date, what ${first} worked on in Cadenza, other research or project affiliations, and interests outside of school.`,
  ];
}

/** In display order. */
export const TEAM: TeamMember[] = [
  {
    name: "Caleb Standfield",
    role: "Backend, LLM tagging, analytics",
    headshot: null,
    color: "#ff6467",
    bio: [
      "I'm a full stack engineer with a backend and systems lean, graduating in December 2026 from the University of Utah with a B.S. in Computer Science on the AI track, a Japanese minor, and a Data Science Certificate.",
      "In summer 2026 I was a Software Engineer Intern at Adobe, where I built an LLM code migration pipeline that moves AppMeasurement analytics code to the Web SDK, from ingest through deterministic and LLM translation to writeback.",
    ],
    email: "calebjstandfield@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/caleb-standfield/",
      github: "https://github.com/CalebStandfield",
      portfolio: "https://calebstandfield.dev",
    },
  },
  { name: "Kevin", role: "Developer", headshot: null, color: "#0a84ff", bio: stubBio("Kevin"), email: "#", links: STUB_LINKS },
  { name: "Troy", role: "Developer", headshot: null, color: "#30d158", bio: stubBio("Troy"), email: "#", links: STUB_LINKS },
  { name: "David", role: "Developer", headshot: null, color: "#ff9f0a", bio: stubBio("David"), email: "#", links: STUB_LINKS },
];
