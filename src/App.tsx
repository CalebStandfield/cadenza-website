import { useRef, type ComponentType } from "react";
import { Nav } from "./components/Nav";
import { PhoneFrame } from "./components/PhoneFrame";
import { NebulaBackdrop } from "./components/nebula/NebulaBackdrop";
import { useActiveAnchor } from "./components/useActiveAnchor";
import { usePhonePose } from "./components/usePhonePose";
import { useSyncHash } from "./components/useSyncHash";
import { ANCHORS } from "./content/anchors";
import { SECTIONS, type SectionDef } from "./content/sections";
import { About } from "./sections/About";
import { Download } from "./sections/Download";
import { Team } from "./sections/Team";
import { Tutorial } from "./sections/Tutorial";
import { PAGE_NEBULA, PAGE_NEBULA_BLUE } from "./theme";
import "./styles/layout.css";

/** The component that renders each section, by section id. */
const SECTION_BODIES: Record<string, ComponentType<{ section: SectionDef }>> = {
  about: About,
  download: Download,
  team: Team,
  tutorial: Tutorial,
};

const ANCHOR_IDS = ANCHORS.map((anchor) => anchor.id);

export default function App() {
  const activeId = useActiveAnchor(ANCHOR_IDS);
  const stickyPhone = useRef<HTMLDivElement>(null);
  usePhonePose(stickyPhone, SECTIONS);
  const active = ANCHORS.find((anchor) => anchor.id === activeId) ?? ANCHORS[0];
  const activeSection = active.section ?? active.id;
  useSyncHash(activeId ? activeSection : null);

  return (
    <>
      <NebulaBackdrop colors={PAGE_NEBULA} reserved={PAGE_NEBULA_BLUE} />
      <Nav active={activeSection} />
      <div className="showcase">
        <main className="showcase-text">
          {SECTIONS.map((section) => {
            const Body = SECTION_BODIES[section.id];
            return Body ? <Body key={section.id} section={section} /> : null;
          })}
        </main>
        <aside className="showcase-phone" aria-hidden="true">
          <div className="showcase-phone-sticky" ref={stickyPhone}>
            <PhoneFrame screen={active.screen} />
          </div>
        </aside>
      </div>
    </>
  );
}
