import { Icon } from "../components/Icon";
import { SONGS, TAGS } from "./mock-data";
import { Artwork, TagPill } from "./parts";

/** Tagging one song, with the LLM's suggestions underneath. */
export function SuggestScreen() {
  const song = SONGS[1];
  return (
    <div className="m-screen">
      <div className="m-song-head">
        <Artwork art={song.art} size={64} />
        <div>
          <div className="m-player-title">{song.title}</div>
          <div className="m-muted">{song.artist}</div>
        </div>
      </div>
      <div className="m-label">On this song</div>
      <div className="m-pills wrap">
        {song.tags.map((tag) => (
          <TagPill key={tag.name} tag={tag} />
        ))}
      </div>
      <div className="m-label">
        <Icon name="sparkles" size={11} /> Suggested for you
      </div>
      <div className="m-card">
        {[TAGS.lofi, TAGS.latenight, TAGS.chill].map((tag) => (
          <div key={tag.name} className="m-kv">
            <TagPill tag={tag} outline />
            <span className="m-round small">
              <Icon name="plus" size={11} />
            </span>
          </div>
        ))}
      </div>
      <div className="m-label">Your tags</div>
      <div className="m-pills wrap">
        {[TAGS.sunday, TAGS.roadTrip, TAGS.gym, TAGS.energy].map((tag) => (
          <TagPill key={tag.name} tag={tag} outline />
        ))}
      </div>
    </div>
  );
}
