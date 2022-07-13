import React from "react";
import "./target-container.css";
import { keyConfigs, playSound } from "../../Helpers/sounds";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores";

const TargetContainer = () => {
  const { main_store } = useStores();

  React.useEffect(() => {
    const keydownHandler = (ev: KeyboardEvent) => {
      main_store.onKeyPress(ev.key);
      playSound(ev.key).then(() => main_store.setActiveKey(undefined));
    };

    document.addEventListener("keydown", keydownHandler);

    return () => document.removeEventListener("keydown", keydownHandler);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [main_store.onKeyPress]);

  return (
    <div id="controls" className="control container">
      {keyConfigs.map((item) => (
        <div
          key={item.id}
          className={`card control ${
            main_store.active_key === item.key ? "playing" : ""
          }`}
        >
          <div className="label container">{item.key.toUpperCase()}</div>
          <div className="key container">{item.id.replace("_", " ")}</div>
        </div>
      ))}
    </div>
  );
};

export default observer(TargetContainer);
