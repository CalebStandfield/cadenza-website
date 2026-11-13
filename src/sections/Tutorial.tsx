import { PhoneFrame } from "../components/PhoneFrame";
import { Section } from "../components/Section";
import type { SectionDef } from "../content/sections";
import { TUTORIAL_STEPS } from "../content/tutorial";

export function Tutorial({ section }: { section: SectionDef }) {
  return (
    <Section section={section}>
      <span className="eyebrow">Tutorial</span>
      <h2>How to use it</h2>
      <p className="lead">Five steps from a fresh install to your first tag query.</p>
      <ol className="steps">
        {TUTORIAL_STEPS.map((step, i) => (
          <li key={step.id} id={step.id} className="step">
            <span className="step-number">{i + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p className="muted">{step.body}</p>
              <div className="step-phone">
                <PhoneFrame screen={step.screen} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
