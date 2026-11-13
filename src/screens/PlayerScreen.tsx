import { Icon } from "../components/Icon";
import { SONGS } from "./mock-data";
import { Artwork, TagPill } from "./parts";

export function PlayerScreen() {
  const song = SONGS[2];
  return (
    <div className="m-screen m-player" style={{ background: `linear-gradient(180deg, ${song.art[0]}55, var(--background) 70%)` }}>
      <div className="m-grabber" />
      <div className="m-player-art">
        <Artwork art={song.art} size={210} />
      </div>
      <div className="m-player-head">
        <div>
          <div className="m-player-title">{song.title}</div>
          <div className="m-muted">{song.artist}</div>
        </div>
        <span style={{ color: "var(--like)" }}>
          <Icon name="heart" size={18} />
        </span>
      </div>
      <div className="m-pills">
        {song.tags.map((tag) => (
          <TagPill key={tag.name} tag={tag} />
        ))}
      </div>
      <div className="m-progress">
        <span style={{ width: "38%" }} />
      </div>
      <div className="m-times m-muted">
        <span>1:24</span>
        <span>-2:17</span>
      </div>
      <div className="m-controls">
        <span style={{ transform: "scaleX(-1)", display: "flex" }}>
          <Icon name="next" size={24} />
        </span>
        <Icon name="pause" size={34} />
        <Icon name="next" size={24} />
      </div>
    </div>
  );
}
