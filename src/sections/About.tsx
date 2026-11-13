import type { ReactNode } from "react";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { Icon } from "../components/Icon";
import { Section } from "../components/Section";
import { ABOUT_PARTS } from "../content/about";
import type { SectionDef } from "../content/sections";

const STACK = [
  { name: "Expo + React Native", what: "one app for iOS and Android" },
  { name: "Apple MusicKit", what: "library, catalog, playback, through our own native module" },
  { name: "Rust, axum + SeaORM", what: "tags, the query engine, listening history" },
  { name: "Supabase", what: "postgres and auth" },
  { name: "LLM tagging", what: "suggests tags for songs you have not tagged yet" },
  { name: "Python embeddings", what: "similarity for the social feed" },
];

/** The body under each About heading, by part id. */
const PART_BODIES: Record<string, ReactNode> = {
  "about-problem": (
    <p>
      Streaming apps sort music by artist, album, and whatever playlists you made by hand. That is not how people
      think about songs. You want "chill songs for studying that are not too slow", and the only way to get that
      today is to build the playlist yourself, one song at a time, and keep it up to date forever.
    </p>
  ),
  "about-does": (
    <>
      <p>
        Every song can carry tags. Some are simple, like Focus or Road Trip. Some hold a value, like Energy 8 or
        Mood: Happy. Cadenza also suggests tags with an LLM, so a big library does not have to be tagged by hand.
      </p>
      <p>
        Then you build a query by dragging tags into and, or, and not groups. The result is a live playlist: tag a
        new song and it shows up. Queries also search past your own library, across every song Cadenza knows.
        Listening is logged too, so the Analytics tab can show what you actually play.
      </p>
    </>
  ),
  "about-built": (
    <>
      <ArchitectureDiagram />
      <ul className="stack">
        {STACK.map((item) => (
          <li key={item.name} className="glass">
            <strong>{item.name}</strong>
            <span className="muted">{item.what}</span>
          </li>
        ))}
      </ul>
    </>
  ),
};

export function About({ section }: { section: SectionDef }) {
  return (
    <Section section={section}>
      <span className="eyebrow">About</span>
      <h1>
        Your library, <span className="gradient-text">tagged your way.</span>
      </h1>
      <p className="lead">
        Cadenza is a music app built on Apple Music. Tag the songs in your library, then pull a playlist
        back out with a tag query.
      </p>
      <div className="hero-actions">
        <a className="button brand" href="#download">
          <Icon name="download" size={18} /> Get the beta
        </a>
        <a className="button glass glass-interactive" href="#tutorial">
          See how it works
        </a>
      </div>

      {ABOUT_PARTS.map((part) => (
        <div key={part.id} id={part.id} className="about-part">
          <h3>{part.title}</h3>
          {PART_BODIES[part.id]}
        </div>
      ))}
    </Section>
  );
}
