import React, { createContext, useContext, ReactNode } from "react";
import AuthStore from "./AuthStore";
import WorksStore from "./WorksStore";
import UserStore from "./UserStore";
import PostStore from "./PostStore";
import CommunityStore from "./CommunityStore";

export interface IRootStore {
  authStore: AuthStore;
  worksStore: WorksStore;
  userStore: UserStore;
  postStore: PostStore;
  communityStore: CommunityStore;
}

class RootStore {
  authStore: AuthStore;
  worksStore: WorksStore;
  userStore: UserStore;
  postStore: PostStore;
  communityStore: CommunityStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.worksStore = new WorksStore(this);
    this.userStore = new UserStore(this);
    this.postStore = new PostStore(this);
    this.communityStore = new CommunityStore(this);
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
