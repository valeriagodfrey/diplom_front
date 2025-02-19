/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/CommunityStore.ts
import { makeAutoObservable } from "mobx";
import CommunityService, { ICommunity } from "../services/CommunityService";
import { toast } from "react-toastify";
import { IRootStore } from "./RootStore";

class CommunityStore {
  rootStore: IRootStore;
  communities: ICommunity[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async fetchCommunities() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await CommunityService.getCommunities();
      this.communities = data;
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchMyCommunities(userId: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await CommunityService.getMyCommunities(userId);
      this.communities = data;
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createCommunity(data: any) {
    try {
      const newCommunity = await CommunityService.createCommunity(data);
      this.communities.push(newCommunity);
      toast.success("Сообщество успешно создано!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async updateCommunity(id: number, data: any) {
    try {
      const updatedCommunity = await CommunityService.updateCommunity(id, data);
      this.communities = this.communities.map((c) =>
        c.id === id ? updatedCommunity : c
      );
      toast.success("Сообщество успешно обновлено!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async deleteCommunity(id: number) {
    try {
      await CommunityService.deleteCommunity(id);
      this.communities = this.communities.filter((c) => c.id !== id);
      toast.success("Сообщество успешно удалено!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async joinCommunity(communityId: number, userId: string) {
    try {
      const updatedCommunity = await CommunityService.joinCommunity(
        communityId,
        userId
      );
      this.communities = this.communities.map((c) =>
        c.id === communityId ? updatedCommunity : c
      );
      toast.success("Вы успешно вступили в сообщество!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async leaveCommunity(communityId: number, userId: string) {
    try {
      const updatedCommunity = await CommunityService.leaveCommunity(
        communityId,
        userId
      );
      this.communities = this.communities.map((c) =>
        c.id === communityId ? updatedCommunity : c
      );
      toast.success("Вы успешно покинули сообщество!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  async fetchCommunityById(communityId: number) {
    try {
      const updatedCommunity = await CommunityService.getCommunityById(
        communityId
      );

      return updatedCommunity;
    } catch (error: any) {
      this.error = error.message;
      throw error;
    }
  }
}

export default CommunityStore;
