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
      loading: true,
      setUser: (user) => set({ user, loading: false }),
      clearUser: () => set({ user: null, loading: false }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: LOCAL_STORAGE_NAMES.EMERGING_LEADERS_CURRENT_USER,
      onRehydrateStorage: () => (state) => {
        // Once hydration completes, if user exists -> stop loading
        if (state?.user) {
          state.setLoading(false);
        } else {
          state?.setLoading(false);
        }
      },
    }
  )
);
