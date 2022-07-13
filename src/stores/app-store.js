import { action, observable } from "mobx";

export default class AppStore {
  constructor(root_store) {
    this.root_store = root_store;
  }

  @observable has_game_started = false;
  @observable is_playing_back = false;
  @observable is_recording = false;

  @action.bound
  setStarted(has_started) {
    this.has_game_started = has_started;
  }

  @action.bound
  setIsPlayingBack(is_playing_back) {
    this.is_playing_back = is_playing_back;
  }

  @action.bound
  setIsRecording(is_recording) {
    this.is_recording = is_recording;
  }
}
