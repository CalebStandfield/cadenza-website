import { SONGS } from "./mock-data";
import { Chips, ScreenTitle, SongRow } from "./parts";

export function LibraryScreen() {
  return (
    <div className="m-screen">
      <ScreenTitle title="Library" action />
      <Chips items={["Songs", "Albums", "Artists", "Playlists"]} active="Songs" />
      {SONGS.slice(0, 6).map((song) => (
        <SongRow key={song.title} song={song} />
      ))}
    </div>
  );
}
