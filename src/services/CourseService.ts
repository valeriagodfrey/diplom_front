// src/services/CourseService.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ICourse {
  id: number;
  title: string;
  description: string;
  image: string;
  introLessonTitle: string;
  introLessonContent: string;
}

class CourseService {
  static async getCourses(): Promise<ICourse[]> {
    const response = await fetch("http://localhost:4200/courses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка загрузки курсов");
    }
    return response.json();
  }

  static async getCourseById(id: number): Promise<ICourse> {
    const response = await fetch(`http://localhost:4200/courses/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка получения курса");
    }
    return response.json();
  }

  static async createCourse(data: any): Promise<ICourse> {
    const response = await fetch("http://localhost:4200/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка создания курса");
    }
    return response.json();
  }

  static async updateCourse(id: number, data: any): Promise<ICourse> {
    const response = await fetch(`http://localhost:4200/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка обновления курса");
    }
    return response.json();
  }

  static async deleteCourse(id: number): Promise<any> {
    const response = await fetch(`http://localhost:4200/courses/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка удаления курса");
    }
    return response.json();
  }
}

export default CourseService;
