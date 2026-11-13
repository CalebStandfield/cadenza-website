import "./ArchitectureDiagram.css";

type Box = { x: number; y: number; w: number; title: string; sub: string; tone?: "brand" | "note" | "flag" };

const BOX_H = 58;
const BOX_W = 165;

const BOXES: Box[] = [
  { x: 10, y: 91, w: BOX_W, title: "Apple Music", sub: "songs + playback", tone: "brand" },
  { x: 205, y: 91, w: BOX_W, title: "Cadenza app", sub: "Expo, iOS + Android", tone: "note" },
  { x: 400, y: 91, w: BOX_W, title: "Rust API", sub: "axum + SeaORM", tone: "flag" },
  { x: 595, y: 11, w: BOX_W, title: "Supabase", sub: "postgres + auth" },
  { x: 595, y: 91, w: BOX_W, title: "LLM tagging", sub: "suggested tags" },
  { x: 595, y: 171, w: BOX_W, title: "ML service", sub: "python embeddings" },
];

/** [left, right] box indexes, drawn as two way links between their facing edges. */
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [2, 5],
];

/** How the pieces talk to each other. */
export function ArchitectureDiagram() {
  return (
    <figure className="arch">
      <svg viewBox="0 0 770 240" role="img" aria-label="Cadenza architecture">
        <defs>
          <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="arch-arrowhead" />
          </marker>
        </defs>
        {LINKS.map(([left, right]) => {
          const a = BOXES[left];
          const b = BOXES[right];
          return (
            <line
              key={`${left}-${right}`}
              x1={a.x + a.w}
              y1={a.y + BOX_H / 2}
              x2={b.x}
              y2={b.y + BOX_H / 2}
              className="arch-link"
              markerStart="url(#arch-arrow)"
              markerEnd="url(#arch-arrow)"
            />
          );
        })}
        {BOXES.map((box) => (
          <g key={box.title} className={box.tone ? `arch-box ${box.tone}` : "arch-box"}>
            <rect x={box.x} y={box.y} width={box.w} height={BOX_H} rx={12} />
            <text x={box.x + box.w / 2} y={box.y + 25} className="arch-title">
              {box.title}
            </text>
            <text x={box.x + box.w / 2} y={box.y + 43} className="arch-sub">
              {box.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="muted">The app talks to Apple Music for songs and to our API for tags and queries.</figcaption>
    </figure>
  );
}
