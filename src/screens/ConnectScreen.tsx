import { Icon } from "../components/Icon";

/** The onboarding step that links Apple Music, over the app's nebula. */
export function ConnectScreen() {
  return (
    <div className="m-screen m-connect">
      <div className="m-nebula" />
      <div className="m-connect-body">
        <span className="m-am-icon">
          <Icon name="apple" size={30} />
        </span>
        <h4>Connect Apple Music</h4>
        <p className="m-muted">Cadenza reads your library and plays through Apple Music. Your songs stay where they are.</p>
        <div className="m-cta">Connect</div>
        <span className="m-muted">Requires an Apple Music subscription</span>
      </div>
    </div>
  );
}
