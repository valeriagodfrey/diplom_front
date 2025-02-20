/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/CourseStore.ts
import { makeAutoObservable } from "mobx";
import CourseService, { ICourse } from "../services/CourseService";
import { toast } from "react-toastify";
import { IRootStore } from "./RootStore";

class CourseStore {
  rootStore: IRootStore;
  courses: ICourse[] = [];
  selectedCourse: ICourse | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async fetchCourses() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await CourseService.getCourses();
      this.courses = data;
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchCourseById(courseId: number) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await CourseService.getCourseById(courseId);
      this.selectedCourse = data;
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createCourse(data: any) {
    try {
      const newCourse = await CourseService.createCourse(data);
      this.courses.push(newCourse);
      toast.success("Курс успешно создан!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async updateCourse(courseId: number, data: any) {
    try {
      const updatedCourse = await CourseService.updateCourse(courseId, data);
      this.courses = this.courses.map((course) =>
        course.id === courseId ? updatedCourse : course
      );
      if (this.selectedCourse?.id === courseId) {
        this.selectedCourse = updatedCourse;
      }
      toast.success("Курс успешно обновлен!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async deleteCourse(courseId: number) {
    try {
      await CourseService.deleteCourse(courseId);
      this.courses = this.courses.filter((course) => course.id !== courseId);
      toast.success("Курс успешно удален!");
    } catch (error: any) {
      toast.error(error.message);
    }
  }
}

export default CourseStore;
