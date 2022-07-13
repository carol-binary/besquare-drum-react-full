import "./sequence-container.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores";

const SequenceContainer = () => {
  const { main_store } = useStores();

  const previous_target_keys = main_store.target_keys.slice(
    Math.max(main_store.current_index - 3, 0),
    main_store.current_index
  );

  const current_target_key = main_store.target_keys[main_store.current_index];
  const next_target_keys = main_store.target_keys.slice(
    main_store.current_index + 1,
    Math.min(main_store.current_index + 4, main_store.target_keys.length)
  );

  while (previous_target_keys.length < 3) {
    previous_target_keys.unshift("");
  }

  while (next_target_keys.length < 3) {
    next_target_keys.push("");
  }

  const filtered_target_keys = [
    ...previous_target_keys,
    current_target_key,
    ...next_target_keys,
  ];

  return (
    <div id="targets" className="sequence container">
      {filtered_target_keys.map((key, index) => (
        <div
          key={index}
          className={`card sequence-card  ${index === 3 ? "active" : ""} `}
        >
          {key}
        </div>
      ))}
    </div>
  );
};

export default observer(SequenceContainer);
