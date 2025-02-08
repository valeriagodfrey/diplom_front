// src/controllers/AuthController.ts
import { useRootStore } from "../stores/RootStore";
import AuthService from "../services/AuthService";
import { LoginType, RegisterType } from "../dto/AuthTypes";

const AuthController = () => {
  const { authStore } = useRootStore();

  const login = async () => {
    const data: LoginType = {
      email: authStore.email,
      password: authStore.password,
      login: authStore.login,
    };
    await AuthService.login(data);
    authStore.signIn(data);
  };

  const register = async () => {
    const data: RegisterType = {
      email: authStore.email,
      password: authStore.password,
      userType: authStore.userType,
      login: authStore.login,
      experience:
        authStore.userType === "mentor" ? authStore.experience : undefined,
      direction:
        authStore.userType === "mentor" ? authStore.direction : undefined,
    };
    await AuthService.register(data);
    authStore.signUp(data);
  };

  const switchToRegister = () => {
    authStore.switchToRegister();
  };

  const switchToLogin = () => {
    authStore.switchToLogin();
  };

  const setLoginModalVisible = (visible: boolean) => {
    authStore.isRegister = false;
    authStore.setModalVisible(visible);
  };

  const setRegisterModalVisible = (visible: boolean) => {
    authStore.isRegister = true;
    authStore.setModalVisible(visible);
  };

  const handleInputChange = (field: keyof AuthStore, value: string) => {
    authStore.handleInputChange(field, value);
  };

  return {
    login,
    register,
    switchToRegister,
    switchToLogin,
    setLoginModalVisible,
    setRegisterModalVisible,
    handleInputChange,
  };
};

export default AuthController;
