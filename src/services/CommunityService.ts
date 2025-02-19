// src/services/CommunityService.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";

export interface ICommunity {
  id: number;
  name: string;
  category: string;
  description?: string;
  image: string;
  userId: string;
  membersCount: number;
  // Дополнительно можно добавить isMember, если сервер будет возвращать такую информацию
}

class CommunityService {
  static async getCommunities(): Promise<ICommunity[]> {
    const response = await fetch("http://localhost:4200/communities", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Ошибка загрузки сообществ");
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
      toast.error(errorData.message || "Ошибка загрузки ваших сообществ");
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
      toast.error(errorData.message || "Ошибка создания сообщества");
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
      toast.error(errorData.message || "Ошибка обновления сообщества");
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
      toast.error(errorData.message || "Ошибка удаления сообщества");
    }
    return response.json();
  }

  static async joinCommunity(id: number, userId: string): Promise<ICommunity> {
    const response = await fetch(
      `http://localhost:4200/communities/${id}/join`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Ошибка вступления в сообщество");
    }
    return response.json();
  }

  static async leaveCommunity(id: number, userId: string): Promise<ICommunity> {
    const response = await fetch(
      `http://localhost:4200/communities/${id}/leave`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Ошибка выхода из сообщества");
    }
    return response.json();
  }
  static async getCommunityById(id: number): Promise<any> {
    const response = await fetch(`http://localhost:4200/communities/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка получения сообщества");
    }
    return response.json();
  }
}

export default CommunityService;
