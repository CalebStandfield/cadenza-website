import type { ScreenKey } from "../screens";
import { PhoneFrame } from "./PhoneFrame";
import { useCycle } from "./useCycle";

const CYCLE_MS = 3800;

/** A phone that steps through `screens`, restarting when `cycleKey` changes. */
export function CyclingPhone({ screens, cycleKey }: { screens: readonly ScreenKey[]; cycleKey: string }) {
  const index = useCycle(screens.length, CYCLE_MS, cycleKey);

  return (
    <div className="cycling-phone">
      <PhoneFrame screen={screens[index]} />
      {screens.length > 1 ? (
        <div className="cycle-dots" aria-hidden="true">
          {screens.map((screen, i) => (
            <span key={screen} className={i === index ? "active" : undefined} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
