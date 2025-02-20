/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { IRootStore } from "./RootStore";
import { toast } from "react-toastify";
import WorksService from "../services/WorksService";

function bufferToBase64(bufferObj: any): string {
  if (bufferObj && Array.isArray(bufferObj.data)) {
    let binary = "";
    const bytes = new Uint8Array(bufferObj.data);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  return "";
}

class WorksStore {
  rootStore: IRootStore;
  works: any[] = [];
  myWorks: any[] = [];
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
      this.works = data.map((work: any) => {
        let imageUrl = work.image;
        // Если поле image пришло как сериализованный Buffer (объект с data)
        if (work.image && work.image.data && Array.isArray(work.image.data)) {
          const base64 = bufferToBase64(work.image);
          imageUrl = `data:image/png;base64,${base64}`;
        }
        return { ...work, image: imageUrl };
      });
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchMyWorks(id: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await WorksService.getMyWorks(id);
      this.myWorks = data.map((work: any) => {
        let imageUrl = work.image;
        if (work.image && work.image.data && Array.isArray(work.image.data)) {
          const base64 = bufferToBase64(work.image);
          imageUrl = `data:image/png;base64,${base64}`;
        }
        return { ...work, image: imageUrl };
      });
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createWork(payload: any) {
    try {
      const newWork = await WorksService.createWork(payload);
      let imageUrl = newWork.image;
      if (
        newWork.image &&
        newWork.image.data &&
        Array.isArray(newWork.image.data)
      ) {
        const base64 = bufferToBase64(newWork.image);
        imageUrl = `data:image/png;base64,${base64}`;
      }
      this.works.push({ ...newWork, image: imageUrl });
      toast.success("Работа успешно создана!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async updateWork(id: number, payload: any): Promise<any> {
    try {
      const updatedWork = await WorksService.updateWork(id, payload);
      let imageUrl = updatedWork.image;
      if (
        updatedWork.image &&
        updatedWork.image.data &&
        Array.isArray(updatedWork.image.data)
      ) {
        const base64 = bufferToBase64(updatedWork.image);
        imageUrl = `data:image/png;base64,${base64}`;
      }
      updatedWork.image = imageUrl;
      this.works = this.works.map((w) => (w.id === id ? updatedWork : w));
      return updatedWork; // возвращаем обновлённую работу
    } catch (error: any) {
      toast.error(error.message);
      return null; // или можно выбросить ошибку, если это предпочтительнее
    }
  }

  async remove(id: number) {
    try {
      await WorksService.remove(id);
      this.works = this.works.filter((w) => w.id !== id);
      toast.success("Работа успешно удалена!");
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
    const updatedWork = await this.updateWork(id, payload);
    console.log("updatedWork:", updatedWork);
    if (!updatedWork) return;

    const { userStore } = this.rootStore;
    if (userStore.user) {
      let fav: number[] = userStore.user.favoriteWorks || [];
      if (updatedWork.isFavorite) {
        if (!fav.includes(id)) {
          fav = [...fav, id];
        }
      } else {
        fav = fav.filter((workId: number) => workId !== id);
      }
      console.log("New favoriteWorks array:", fav);
      const updatedUser = await userStore.updateUser({ favoriteWorks: fav });
      console.log("updatedUser:", updatedUser);
    }
  }
}

export default WorksStore;
