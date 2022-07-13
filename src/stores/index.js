import React from "react";
import AppStore from "./app-store";
import MainStore from "./main-store";

class RootStore {
  constructor() {
    this.app_store = new AppStore(this);
    this.main_store = new MainStore(this);
  }
}

let stores_context;

export const useStores = () => {
  if (!stores_context) {
    const root_store = new RootStore();

    stores_context = React.createContext({
      app_store: root_store.app_store,
      main_store: root_store.main_store,
    });
  }

  return React.useContext(stores_context);
};
