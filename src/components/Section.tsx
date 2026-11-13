import type { ReactNode } from "react";
import type { SectionDef } from "../content/sections";
import { PhoneFrame } from "./PhoneFrame";

/**
 * One page section. On narrow screens the sticky phone is hidden, so each
 * section shows its own phone above its text.
 */
export function Section({ section, children }: { section: SectionDef; children: ReactNode }) {
  return (
    <section id={section.id} className="section">
      <div className="section-phone">
        <PhoneFrame screen={section.screen} />
      </div>
      {children}
    </section>
  );
}
