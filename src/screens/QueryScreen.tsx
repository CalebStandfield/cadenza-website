import { SONGS, TAGS } from "./mock-data";
import { ScreenTitle, SongRow, TagPill } from "./parts";

/** The drag and drop query tree: (Road Trip or Gym) and not Rainy Day. */
export function QueryScreen() {
  return (
    <div className="m-screen">
      <ScreenTitle title="Query" />
      <div className="m-group and">
        <span className="m-op">AND</span>
        <div className="m-group or">
          <span className="m-op">OR</span>
          <div className="m-pills wrap">
            <TagPill tag={TAGS.roadTrip} />
            <TagPill tag={TAGS.gym} />
          </div>
        </div>
        <div className="m-group not">
          <span className="m-op">NOT</span>
          <TagPill tag={TAGS.rainy} />
        </div>
        <div className="m-drop">Drag a tag here</div>
      </div>
      <div className="m-label">
        3 songs <span className="m-muted">from your library and beyond</span>
      </div>
      {[SONGS[0], SONGS[3], SONGS[4]].map((song) => (
        <SongRow key={song.title} song={song} showTags={false} />
      ))}
      <div className="m-cta">Save as playlist</div>
    </div>
  );
}
