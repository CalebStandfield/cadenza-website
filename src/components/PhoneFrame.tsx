import type { CSSProperties } from "react";
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

/** Layers behind the face, each a little deeper, that read as the phone's metal edge when it turns. */
const EDGE_LAYERS = 8;

/**
 * An iPhone shaped frame showing one screen, fading in when it changes. Sits
 * in 3D: turned by the --rx, --ry, --rz variables it inherits (see
 * usePhonePose), with a metal edge, glare on the glass and a floor shadow.
 */
export function PhoneFrame({ screen }: { screen: ScreenKey }) {
  const def = SCREENS[screen];

  return (
    <div className="phone-stage">
      <div className="phone-float">
        <div className="phone-3d">
          {Array.from({ length: EDGE_LAYERS }, (_, i) => (
            <span key={i} className="phone-edge" style={{ "--depth": i + 1 } as CSSProperties} />
          ))}
          <div className="phone">
            <span className="phone-button action" />
            <span className="phone-button volume-up" />
            <span className="phone-button volume-down" />
            <span className="phone-button power" />
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
              <span className="phone-glare" />
            </div>
          </div>
        </div>
      </div>
      <span className="phone-shadow" />
    </div>
  );
}
