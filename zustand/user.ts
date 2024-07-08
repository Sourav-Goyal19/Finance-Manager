import { UserData } from "@/types";
import { create } from "zustand";

interface UserState {
  user: UserData | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
}

export const useUser = create<UserState>()((set) => ({
  user: null,
  setUser: (user: UserData) => set({ user }),
  clearUser: () => set({ user: null }),
}));
