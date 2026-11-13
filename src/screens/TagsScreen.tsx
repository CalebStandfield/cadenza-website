import { Icon } from "../components/Icon";
import { TAGS } from "./mock-data";
import { ScreenTitle, TagPill } from "./parts";

const ACTIVITY = [
  { name: "My Plays", value: "212" },
  { name: "First Played", value: "Mar 4" },
  { name: "Last Played", value: "Today" },
];

export function TagsScreen() {
  return (
    <div className="m-screen">
      <ScreenTitle title="Tags" action />
      <div className="m-label">Your tags</div>
      <div className="m-pills wrap">
        {[TAGS.focus, TAGS.roadTrip, TAGS.sunday, TAGS.gym, TAGS.chill, TAGS.rainy, TAGS.energy, TAGS.mood].map((tag) => (
          <TagPill key={tag.name} tag={tag} />
        ))}
      </div>
      <div className="m-label">Suggested tags</div>
      <div className="m-pills wrap">
        {[TAGS.lofi, TAGS.latenight, TAGS.indie].map((tag) => (
          <TagPill key={tag.name} tag={tag} outline />
        ))}
      </div>
      <div className="m-label">Activity tags</div>
      <div className="m-card">
        {ACTIVITY.map((tag) => (
          <div key={tag.name} className="m-kv">
            <span>
              <Icon name="chart" size={11} /> {tag.name}
            </span>
            <span className="m-muted">{tag.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
