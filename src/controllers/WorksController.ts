// src/controllers/WorksController.ts
import { useContext } from "react";
import RootStoreContext from "../stores/RootStore";

const useWorksController = () => {
  const rootStore = useContext(RootStoreContext);
  return rootStore.worksStore;
};

export default useWorksController;
