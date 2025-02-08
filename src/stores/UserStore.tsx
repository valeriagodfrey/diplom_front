/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/UserStore.ts
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import UserService, { IUser } from "../services/UserService";
import { IRootStore } from "./RootStore";

class UserStore {
  rootStore: IRootStore;
  user: IUser | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async fetchUser(id: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await UserService.getUserById(id);
      this.user = data;
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async updateUser(updateData: Partial<IUser>) {
    if (!this.user) return;
    this.isLoading = true;
    this.error = null;
    try {
      const data = await UserService.updateUser(this.user.id, updateData);
      this.user = data;
      toast.success("Профиль успешно обновлён");
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }
}

export default UserStore;
