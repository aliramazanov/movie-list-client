import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "../definitions";

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
