export interface IUser {
  id: string;
  email: string;
  firstName: string;
  secondName: string;
  nickName: string;
  role: "user" | "mentor";
  dob?: string; // дата рождения (необязательное)
  phone?: string; // номер телефона (необязательное)
  country?: string; // страна (необязательное)
  city?: string; // город (необязательное)
  postalCode?: string; // почтовый индекс (необязательное)
  joinedCommunities: number[];
  favoriteWorks: number[];
}

class UserService {
  static async getUserById(id: string): Promise<IUser> {
    const response = await fetch(`import.meta.env.VITE_API/users/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка загрузки пользователя");
    }
    return response.json();
  }

  static async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser> {
    const response = await fetch(`import.meta.env.VITE_API/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка обновления пользователя");
    }
    return response.json();
  }
}

export default UserService;
