import { LoginType, RegisterType } from "../dto/AuthTypes";

const AuthService = {
  login: async (data: LoginType) => {
    console.log("AuthService login:", data);
  },

  register: async (data: RegisterType) => {
    console.log("AuthService register:", data);
  },
};

export default AuthService;
