import { CyclingPhone } from "./components/CyclingPhone";
import { Nav } from "./components/Nav";
import { Section } from "./components/Section";
import { useActiveAnchor } from "./components/useActiveAnchor";
import { SECTIONS, type PhoneAnchor } from "./content/sections";
import "./styles/layout.css";

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
          {SECTIONS.map((section) => (
            <Section key={section.id} section={section}>
              <h2>{section.label}</h2>
            </Section>
          ))}
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
