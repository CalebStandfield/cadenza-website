import type { ComponentType } from "react";
import { CyclingPhone } from "./components/CyclingPhone";
import { Nav } from "./components/Nav";
import { useActiveAnchor } from "./components/useActiveAnchor";
import { SECTIONS, type PhoneAnchor, type SectionDef } from "./content/sections";
import { About } from "./sections/About";
import "./styles/layout.css";

/** The component that renders each section, by section id. */
const SECTION_BODIES: Record<string, ComponentType<{ section: SectionDef }>> = {
  about: About,
};

/** Sections first, then anchors nested inside them, so the nested ones win. */
const ANCHORS: readonly PhoneAnchor[] = [...SECTIONS];
const ANCHOR_IDS = ANCHORS.map((anchor) => anchor.id);

export default function App() {
  const activeId = useActiveAnchor(ANCHOR_IDS);
  const active = ANCHORS.find((anchor) => anchor.id === activeId) ?? ANCHORS[0];

  return (
    <>
      <Nav active={active.section ?? active.id} />
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
