/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/WorksService.ts
class WorksService {
  static async getWorks() {
    const response = await fetch(`${import.meta.env.VITE_API}/works`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка загрузки работ");
    }
    return response.json();
  }

  static async getMyWorks(id: string) {
    const response = await fetch(`${import.meta.env.VITE_API}/works/my/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка загрузки работ");
    }
    return response.json();
  }

  // Метод принимает FormData напрямую
  static async createWork(formData: FormData) {
    const response = await fetch(`${import.meta.env.VITE_API}/works/upload`, {
      method: "POST",
      body: formData,
      // Не указываем заголовок Content-Type, чтобы браузер сам сформировал multipart/form-data с boundary
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка создания работы");
    }
    return response.json();
  }

  static async updateWork(id: number, payload: any) {
    const response = await fetch(`${import.meta.env.VITE_API}/works/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка обновления работы");
    }
    return response.json();
  }

  static async remove(id: number) {
    const response = await fetch(`${import.meta.env.VITE_API}/works/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка удаления работы");
    }
    return { message: "Work deleted successfully" };
  }
}

export default WorksService;
