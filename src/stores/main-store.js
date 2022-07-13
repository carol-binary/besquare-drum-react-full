import { action, observable } from "mobx";
import { playSound } from "../Helpers/sounds";

export default class MainStore {
  constructor(root_store) {
    this.root_store = root_store;
  }

  @observable active_key;
  @observable current_index = 0;
  @observable recordArray = [];
  @observable score = 0;
  @observable startTime = 0;

  target_keys = [];

  @action.bound
  generateTestBeat() {
    const test_keys = ["a", "s", "d", "f", "g"];
    const generated_array = [];
    for (let index = 0; index < 10; index++) {
      generated_array.push(...test_keys);
    }
    this.target_keys = generated_array;
    return this.target_keys;
  }

  @action.bound
  onKeyPress = (pressed_key) => {
    const { app_store } = this.root_store;
    this.setActiveKey(pressed_key);

    if (!app_store.has_game_started && !app_store.is_recording) return;

    if (app_store.is_recording) {
      this.setRecordArray([
        ...this.recordArray,
        { key: pressed_key, time: Date.now() - this.startTime },
      ]);
    } else {
      if (this.current_index + 1 <= this.target_keys.length) {
        if (pressed_key === this.target_keys[this.current_index]) {
          this.setScore(this.score + 1);
          this.setCurrentIndex(this.current_index + 1);
        } else {
          this.setScore(this.score - 1);
        }
      }

      if (this.current_index + 1 >= this.target_keys.length) {
        alert("Game is complete!");
      }
    }
  };

  @action.bound
  playRecordedItem(record_item) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        this.setActiveKey(record_item.key);
        await playSound(record_item.key);
        this.setActiveKey(undefined);

        resolve();
      }, record_item.time);
    });
  }

  @action.bound
  setActiveKey(active_key) {
    this.active_key = active_key;
  }

  @action.bound
  setCurrentIndex(current_index) {
    this.current_index = current_index;
  }

  @action.bound
  setRecordArray(recordArray) {
    this.recordArray = recordArray;
  }

  @action.bound
  setScore(score) {
    this.score = score;
  }

  @action.bound
  setStartTime(startTime) {
    this.startTime = startTime;
  }
}
