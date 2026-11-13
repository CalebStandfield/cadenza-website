import type { ComponentType } from "react";
import { CyclingPhone } from "./components/CyclingPhone";
import { Nav } from "./components/Nav";
import { NebulaBackdrop } from "./components/nebula/NebulaBackdrop";
import { useActiveAnchor } from "./components/useActiveAnchor";
import { useSyncHash } from "./components/useSyncHash";
import { SECTIONS, type PhoneAnchor, type SectionDef } from "./content/sections";
import { TUTORIAL_STEPS } from "./content/tutorial";
import { About } from "./sections/About";
import { Download } from "./sections/Download";
import { Team } from "./sections/Team";
import { Tutorial } from "./sections/Tutorial";
import { APPLE_MUSIC_NEBULA } from "./theme";
import "./styles/layout.css";

/** The component that renders each section, by section id. */
const SECTION_BODIES: Record<string, ComponentType<{ section: SectionDef }>> = {
  about: About,
  download: Download,
  team: Team,
  tutorial: Tutorial,
};

/** Sections first, then anchors nested inside them, so the nested ones win. */
const ANCHORS: readonly PhoneAnchor[] = [...SECTIONS, ...TUTORIAL_STEPS];
const ANCHOR_IDS = ANCHORS.map((anchor) => anchor.id);

export default function App() {
  const activeId = useActiveAnchor(ANCHOR_IDS);
  const active = ANCHORS.find((anchor) => anchor.id === activeId) ?? ANCHORS[0];
  const activeSection = active.section ?? active.id;
  useSyncHash(activeId ? activeSection : null);

  return (
    <>
      <NebulaBackdrop colors={APPLE_MUSIC_NEBULA} />
      <Nav active={activeSection} />
      <div className="showcase">
        <main className="showcase-text">
          {SECTIONS.map((section) => {
            const Body = SECTION_BODIES[section.id];
            return Body ? <Body key={section.id} section={section} /> : null;
          })}
        </main>
        <aside className="showcase-phone" aria-hidden="true">
          <div className="showcase-phone-sticky">
            <CyclingPhone screens={active.screens} cycleKey={active.id} />
          </div>
        </aside>
      </div>
    </>
  );
}
