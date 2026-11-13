import { Icon } from "../components/Icon";
import { SONGS } from "./mock-data";
import { Artwork, ScreenTitle } from "./parts";

const POSTS = [
  { who: "Kevin", initials: "K", color: "#0a84ff", text: "shared a playlist", song: SONGS[0] },
  { who: "Troy", initials: "T", color: "#30d158", text: "started a live session", song: SONGS[3] },
  { who: "David", initials: "D", color: "#ff9f0a", text: "is listening to", song: SONGS[5] },
];

export function SocialScreen() {
  return (
    <div className="m-screen">
      <ScreenTitle title="Social" />
      {POSTS.map((post) => (
        <div key={post.who} className="m-card m-post">
          <div className="m-post-head">
            <span className="m-avatar" style={{ background: post.color }}>
              {post.initials}
            </span>
            <span>
              <strong>{post.who}</strong> <span className="m-muted">{post.text}</span>
            </span>
          </div>
          <div className="m-post-body">
            <Artwork art={post.song.art} size={44} />
            <div>
              <div className="m-row-title">{post.song.title}</div>
              <div className="m-row-sub">{post.song.artist}</div>
            </div>
            <span className="m-round small brand">
              <Icon name="play" size={10} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
