import { SCREENS, type ScreenKey, type TabName } from "../screens";
import { Icon, type IconName } from "./Icon";
import "./PhoneFrame.css";

const TABS: { name: TabName; label: string; icon: IconName }[] = [
  { name: "social", label: "Social", icon: "people" },
  { name: "analytics", label: "Analytics", icon: "chart" },
  { name: "cadenza", label: "Cadenza", icon: "cadenza" },
  { name: "library", label: "Library", icon: "stack" },
  { name: "search", label: "Search", icon: "search" },
];

/** An iPhone shaped frame showing one screen, fading in when it changes. */
export function PhoneFrame({ screen }: { screen: ScreenKey }) {
  const def = SCREENS[screen];

  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-status">
          <span>9:41</span>
          <span className="phone-island" />
          <span className="phone-status-icons">
            <span className="phone-signal" />
            <span className="phone-battery" />
          </span>
        </div>
        <div className="phone-content" key={screen}>
          {def.render()}
        </div>
        {def.tab ? (
          <nav className="phone-tabs">
            {TABS.map((tab) => (
              <span key={tab.name} className={tab.name === def.tab ? "phone-tab active" : "phone-tab"}>
                <Icon name={tab.icon} size={18} />
                {tab.label}
              </span>
            ))}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
