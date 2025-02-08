/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/PostStore.ts
import { makeAutoObservable } from "mobx";
import PostService, { IPost } from "../services/PostService";
import { toast } from "react-toastify";
import { IRootStore } from "./RootStore";

class PostStore {
  rootStore: IRootStore;
  posts: IPost[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async fetchPosts(communityId: number) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await PostService.getPostsByCommunity(communityId);
      this.posts = data;
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createPost(communityId: number, data: any) {
    try {
      const newPost = await PostService.createPost(communityId, data);
      this.posts.push(newPost);
      toast.success("Пост успешно создан!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async deletePost(communityId: number, postId: number) {
    try {
      await PostService.deletePost(communityId, postId);
      this.posts = this.posts.filter((p) => p.id !== postId);
      toast.success("Пост успешно удален!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}

export default PostStore;
