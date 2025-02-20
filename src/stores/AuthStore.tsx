/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { IRootStore } from "./RootStore";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Импортируем библиотеку для работы с cookie

class AuthStore {
  rootStore: IRootStore;
  isAuthenticated = false;
  isRegister = false;
  modalVisible = false;

  user: any = null;
  token: null | string = null;
  isLoading = false;
  error = null;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  // Регистрация
  async registration(
    email: string,
    password: string,
    firstName: string,
    secondName: string,
    nickName: string,
    role: "mentor" | "user"
  ) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(
        "import.meta.env.VITE_API/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            firstName,
            secondName,
            nickName,
            role,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Ошибка регистрации");
      }

      const data = await response.json();

      this.token = data.token;

      // Сохраняем токен в cookie (например, на 7 дней)
      Cookies.set("token", data.token, { expires: 7 });

      // После успешной регистрации обновляем данные пользователя
      await this.checkAuth();
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  // Авторизация
  async login(email: string, password: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch("import.meta.env.VITE_API/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Ошибка входа");
      }

      const data = await response.json();

      this.token = data.token;

      // Сохраняем токен в cookie
      Cookies.set("token", data.token, { expires: 7 });

      // Обновляем информацию о пользователе и устанавливаем состояние аутентификации
      await this.checkAuth();
    } catch (error: any) {
      this.error = error.message;
      toast.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  // Проверка аутентификации (например, при загрузке приложения)
  async checkAuth() {
    // Читаем токен из cookie
    const token = Cookies.get("token");
    if (!token) {
      this.isAuthenticated = false;
      this.user = null;
      return;
    }

    this.isLoading = true;

    try {
      const response = await fetch("import.meta.env.VITE_API/auth/check", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка аутентификации");
      }

      const data = await response.json();

      this.user = data.user;

      this.token = token;
      this.isAuthenticated = true;
    } catch (error: any) {
      console.log(error);
      // При ошибке удаляем токен из cookie и сбрасываем состояние
      Cookies.remove("token");
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
    } finally {
      this.isLoading = false;
    }
  }

  // Логаут
  logout() {
    this.user = null;
    this.token = null;
    this.isAuthenticated = false;
    // Удаляем токен из cookie
    Cookies.remove("token");
  }

  switchToRegister = () => {
    this.isRegister = true;
  };

  switchToLogin = () => {
    this.isRegister = false;
  };

  setModalVisible = (visible: boolean) => {
    this.modalVisible = visible;
  };

  handleInputChange = (field: keyof AuthStore, value: string) => {
    (this[field] as unknown as string) = value;
  };

  setAuthenticated = (authenticated: boolean) => {
    this.isAuthenticated = authenticated;
  };
  setLoginModalVisible = (visible: boolean) => {
    this.isRegister = false;
    this.setModalVisible(visible);
  };

  setRegisterModalVisible = (visible: boolean) => {
    this.isRegister = true;
    this.setModalVisible(visible);
  };
}

export default AuthStore;
