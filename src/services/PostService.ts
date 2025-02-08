/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPost {
  id: number;
  content: string;
  image?: string;
  communityId: number;
  userId: string;
}

class PostService {
  static async getPostsByCommunity(communityId: number): Promise<IPost[]> {
    const response = await fetch(
      `http://localhost:4200/communities/${communityId}/posts`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка загрузки постов");
    }
    return response.json();
  }

  static async createPost(communityId: number, data: any): Promise<IPost> {
    const response = await fetch(
      `http://localhost:4200/communities/${communityId}/posts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка создания поста");
    }
    return response.json();
  }

  static async deletePost(communityId: number, postId: number): Promise<any> {
    const response = await fetch(
      `http://localhost:4200/communities/${communityId}/posts/${postId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка удаления поста");
    }
    return response.json();
  }
}

export default PostService;
