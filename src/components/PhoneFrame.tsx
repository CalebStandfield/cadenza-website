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

/** Layers behind the face, each a little deeper, that together read as the metal side wall. */
const EDGE_LAYERS = 14;

/**
 * Darkness of edge layer `i`, 0 to 1. The flat middle of the side wall
 * catches the light, the rounded front and back edges turn away from it.
 */
function edgeShade(i: number) {
  const t = (i / (EDGE_LAYERS - 1)) * 2 - 1;
  return 0.1 + 0.45 * t ** 4 + (t > 0 ? 0.15 * t : 0);
}

/** Side buttons, iPhone 15 Pro layout: action and volume on the left, side button on the right. */
const BUTTONS = ["action", "volume-up", "volume-down", "power"] as const;

/**
 * An iPhone shaped frame showing one screen, fading in when it changes. Sits
 * in 3D: turned by the --rx, --ry, --rz variables it inherits (see
 * usePhonePose), with a titanium side wall, buttons, glass and a floor shadow.
 */
export function PhoneFrame({ screen }: { screen: ScreenKey }) {
  const def = SCREENS[screen];

  return (
    <div className="phone-stage">
      <div className="phone-float">
        <div className="phone-3d">
          {Array.from({ length: EDGE_LAYERS }, (_, i) => (
            <span
              key={i}
              className="phone-edge"
              style={{ "--depth": i + 1, "--shade": edgeShade(i).toFixed(3) } as CSSProperties}
            />
          ))}
          {BUTTONS.map((button) => (
            <span key={button} className={`phone-button ${button}`} />
          ))}
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
            <span className="phone-glare" />
          </div>
        </div>
      </div>
      <span className="phone-shadow" />
    </div>
  );
}
