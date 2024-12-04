import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/auth";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const initialState: Omit<AuthState, "login" | "logout"> = {
  token: null,
  isAuthenticated: false,
  user: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      login: (token: string, user: User) =>
        set((state) => ({
          ...state,
          token,
          isAuthenticated: true,
          user,
        })),
      logout: () =>
        set((state) => ({
          ...state,
          ...initialState,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
