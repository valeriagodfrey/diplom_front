/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/WorksStore.ts
import { makeAutoObservable } from "mobx";
import { IRootStore } from "./RootStore";
import { toast } from "react-toastify";
import WorksService from "../services/WorksService";

class WorksStore {
  rootStore: IRootStore;
  works: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async fetchWorks() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await WorksService.getWorks();
      this.works = data;
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async updateWork(id: number, payload: any) {
    try {
      const updatedWork = await WorksService.updateWork(id, payload);
      this.works = this.works.map((w) => (w.id === id ? updatedWork : w));
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async likeWork(id: number) {
    const work = this.works.find((w) => w.id === id);
    if (!work) return;
    const payload = {
      likes: work.isLiked ? work.likes - 1 : work.likes + 1,
      isLiked: !work.isLiked,
    };
    await this.updateWork(id, payload);
  }

  async toggleFavorite(id: number) {
    const work = this.works.find((w) => w.id === id);
    if (!work) return;
    const payload = { isFavorite: !work.isFavorite };
    await this.updateWork(id, payload);
  }
}

export default WorksStore;
