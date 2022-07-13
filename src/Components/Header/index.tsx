import "./header.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores";

const Header = () => {
  const { app_store } = useStores();

  return (
    <nav>
      <div className="branding">Drum App</div>
      <div className="menu-buttons">
        <button
          onClick={() => app_store.setStarted(!app_store.has_game_started)}
        >
          {app_store.has_game_started ? "Stop" : "Start"} Game
        </button>
        <button
          onClick={() => app_store.setIsRecording(!app_store.is_recording)}
        >
          {app_store.is_recording ? "Stop" : "Record"}
        </button>
        <button
          disabled={app_store.is_playing_back}
          onClick={() =>
            !app_store.is_playing_back && app_store.setIsPlayingBack(true)
          }
        >
          Playback
        </button>
      </div>
    </nav>
  );
};

export default observer(Header);
