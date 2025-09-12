import { AdminUserType } from "@/types/AdminUserType";
import { LOCAL_STORAGE_NAMES } from "@/utils/localStorageUtils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: AdminUserType | null;
  loading: boolean;
  setUser: (user: AdminUserType) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: LOCAL_STORAGE_NAMES.EMERGING_LEADERS_CURRENT_USER,
    }
  )
);
