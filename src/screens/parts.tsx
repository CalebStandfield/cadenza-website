import { Icon } from "../components/Icon";
import type { MockSong, MockTag } from "./mock-data";

/** Gradient square standing in for album art. */
export function Artwork({ art, size = 38 }: { art: [string, string]; size?: number }) {
  return (
    <span
      className="m-art"
      style={{ width: size, height: size, background: `linear-gradient(135deg, ${art[0]}, ${art[1]})` }}
    />
  );
}

/** Same look as the app's TagPill: solid tag color, screen colored label. */
export function TagPill({ tag, outline = false }: { tag: MockTag; outline?: boolean }) {
  return (
    <span
      className={tag.suggested ? "m-pill suggested" : "m-pill"}
      style={
        outline
          ? { borderColor: tag.color, color: tag.color }
          : { background: tag.color, borderColor: tag.color }
      }
    >
      <Icon name="tag" size={10} />
      {tag.name}
      {tag.value ? <span className="m-pill-value">{tag.value}</span> : null}
    </span>
  );
}

export function SongRow({ song, showTags = true }: { song: MockSong; showTags?: boolean }) {
  return (
    <div className="m-row">
      <Artwork art={song.art} />
      <div className="m-row-text">
        <div className="m-row-title">{song.title}</div>
        <div className="m-row-sub">{song.artist}</div>
        {showTags && song.tags.length ? (
          <div className="m-pills">
            {song.tags.map((tag) => (
              <TagPill key={tag.name} tag={tag} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ScreenTitle({ title, action }: { title: string; action?: boolean }) {
  return (
    <div className="m-title">
      <h4>{title}</h4>
      {action ? (
        <span className="m-round">
          <Icon name="plus" size={14} />
        </span>
      ) : null}
    </div>
  );
}

export function Chips({ items, active }: { items: string[]; active: string }) {
  return (
    <div className="m-chips">
      {items.map((item) => (
        <span key={item} className={item === active ? "m-chip active" : "m-chip"}>
          {item}
        </span>
      ))}
    </div>
  );
}
