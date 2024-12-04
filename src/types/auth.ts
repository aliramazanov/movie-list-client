export interface User {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  photo: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
