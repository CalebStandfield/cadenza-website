import { SECTIONS } from "../content/sections";

/** Top bar: logo and a link per section, the active one highlighted. */
export function Nav({ active }: { active: string }) {
  return (
    <header className="nav">
      <a href="#about" className="nav-logo">
        <span className="logo-mark">
          <img src="/cadenza-logo.svg" alt="" width={26} height={26} />
        </span>
        <span className="nav-logo-text">Cadenza</span>
      </a>
      <nav className="nav-links">
        {SECTIONS.map((section) => (
          <a key={section.id} href={`#${section.id}`} className={section.id === active ? "active" : undefined}>
            {section.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
