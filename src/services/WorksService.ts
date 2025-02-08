/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/WorksService.ts (клиентская часть)
class WorksService {
  static async getWorks() {
    const response = await fetch("http://localhost:4200/works", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка загрузки работ");
    }
    return response.json();
  }

  // Метод создания работы через FormData (загрузка файла)
  static async createWork(payload: any) {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("category", payload.category);
    formData.append("author", payload.author);
    // payload.image должен быть экземпляром File или Blob
    formData.append("image", payload.image);

    const response = await fetch("http://localhost:4200/works/upload", {
      method: "POST",
      body: formData,
      // Не указываем Content-Type, чтобы браузер сам установил multipart/form-data с boundary
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка создания работы");
    }
    return response.json();
  }

  static async updateWork(id: number, payload: any) {
    const response = await fetch(`http://localhost:4200/works/${id}`, {
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
    const response = await fetch(`http://localhost:4200/works/${id}`, {
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
