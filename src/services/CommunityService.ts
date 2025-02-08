/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ICommunity {
  id: number;
  name: string;
  category: string;
  description?: string;
  image: string;
  userId: string;
}

class CommunityService {
  static async getCommunities(): Promise<ICommunity[]> {
    const response = await fetch("http://localhost:4200/communities", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка загрузки сообществ");
    }
    return response.json();
  }

  static async getMyCommunities(userId: string): Promise<ICommunity[]> {
    const response = await fetch(
      `http://localhost:4200/communities/my/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка загрузки ваших сообществ");
    }
    return response.json();
  }

  static async createCommunity(data: any): Promise<ICommunity> {
    const response = await fetch("http://localhost:4200/communities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка создания сообщества");
    }
    return response.json();
  }

  static async updateCommunity(id: number, data: any): Promise<ICommunity> {
    const response = await fetch(`http://localhost:4200/communities/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка обновления сообщества");
    }
    return response.json();
  }

  static async deleteCommunity(id: number): Promise<any> {
    const response = await fetch(`http://localhost:4200/communities/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка удаления сообщества");
    }
    return response.json();
  }
}

export default CommunityService;
