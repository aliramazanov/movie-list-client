import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice } from "../definitions";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
} as const;

export const useAuthStore = create<AuthSlice>()(
  persist(
    (set) => ({
      ...initialState,
      login: (token, user) => set({ token, isAuthenticated: true, user }),
      logout: () => set(initialState),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
