import { ScreenTitle } from "./parts";

const WEEK = [
  { day: "M", plays: 34 },
  { day: "T", plays: 52 },
  { day: "W", plays: 41 },
  { day: "T", plays: 66 },
  { day: "F", plays: 80 },
  { day: "S", plays: 58 },
  { day: "S", plays: 45 },
];

const TOP_ARTISTS = [
  { name: "The Low Tides", plays: 128 },
  { name: "Mira Vale", plays: 97 },
  { name: "Neon Parade", plays: 74 },
];

export function AnalyticsScreen() {
  const max = Math.max(...WEEK.map((d) => d.plays));
  return (
    <div className="m-screen">
      <ScreenTitle title="Analytics" />
      <div className="m-stats">
        <div className="m-stat">
          <span className="m-muted">Plays</span>
          <strong>376</strong>
        </div>
        <div className="m-stat">
          <span className="m-muted">Hours</span>
          <strong>21.4</strong>
        </div>
        <div className="m-stat">
          <span className="m-muted">Skips</span>
          <strong>12%</strong>
        </div>
      </div>
      <div className="m-card">
        <div className="m-label tight">This week</div>
        <div className="m-bars">
          {WEEK.map((d, i) => (
            <div key={i} className="m-bar-col">
              <span className="m-bar" style={{ height: `${(d.plays / max) * 100}%` }} />
              <span className="m-muted">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="m-label">Most listened artists</div>
      <div className="m-card">
        {TOP_ARTISTS.map((artist, i) => (
          <div key={artist.name} className="m-kv">
            <span>
              <span className="m-rank">{i + 1}</span> {artist.name}
            </span>
            <span className="m-muted">{artist.plays}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
