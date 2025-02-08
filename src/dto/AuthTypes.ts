export interface LoginType {
  email: string;
  password: string;
  login: string;
}

export interface RegisterType {
  email: string;
  password: string;
  login: string;
  userType: string;
  experience?: string | undefined;
  direction?: string | undefined;
}
