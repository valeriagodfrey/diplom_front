/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/WorksService.ts
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
}

export default WorksService;
