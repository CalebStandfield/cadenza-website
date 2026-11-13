import { Icon } from "../components/Icon";
import { Section } from "../components/Section";
import { DOWNLOADS } from "../content/downloads";
import type { SectionDef } from "../content/sections";
import { safeHref } from "../lib/safe-url";

export function Download({ section }: { section: SectionDef }) {
  return (
    <Section section={section}>
      <span className="eyebrow">Download</span>
      <h2>Try the beta</h2>
      <p className="lead">
        Cadenza is in testing. You need an Apple Music subscription on either platform, since playback goes
        through Apple Music.
      </p>
      <div className="downloads">
        {DOWNLOADS.map((download) => (
          <div key={download.platform} className="card download">
            <div className="download-head">
              <span className="download-icon">
                <Icon name={download.icon} size={26} />
              </span>
              <div>
                <h3>{download.platform}</h3>
                <span className="muted">{download.channel}</span>
              </div>
              <span className="badge">Coming soon</span>
            </div>
            <ol className="download-steps">
              {download.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <a className="button brand" href={safeHref(download.href)} aria-disabled="true">
              <Icon name="download" size={18} /> {download.action}
            </a>
            <span className="muted download-note">{download.note}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
