import React, { createContext, useContext, ReactNode } from "react";
import AuthStore from "./AuthStore";
import WorksStore from "./WorksStore";

export interface IRootStore {
  authStore: AuthStore;
  worksStore: WorksStore;
}

class RootStore {
  authStore: AuthStore;
  worksStore: WorksStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.worksStore = new WorksStore(this);
  }
}

const RootStoreContext = createContext<RootStore | undefined>(undefined);

export const RootStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const rootStore = new RootStore();
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error("useRootStore must be used within a RootStoreProvider");
  }
  return context;
};

export default RootStoreContext;
