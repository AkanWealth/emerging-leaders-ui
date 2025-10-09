import { AdminUserType } from "@/types/AdminUserType";
import { LOCAL_STORAGE_NAMES } from "@/utils/localStorageUtils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import adminService from "@/services/adminService";

type UserApiResponse =
  | AdminUserType
  | {
      error?: string;
      statusCode?: string;
    };

interface UserState {
  user: AdminUserType | null;
  loading: boolean;
  setUser: (user: AdminUserType) => Promise<void>;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,

      // ✅ When setting user, immediately trigger a background refresh
      setUser: async (user) => {
        set({ user, loading: true });
        try {
          await get().fetchUser();
        } catch (err) {
          console.error("❌ Failed to refetch user after setUser:", err);
          set({ loading: false });
        }
      },

      clearUser: () => set({ user: null, loading: false }),
      setLoading: (loading) => set({ loading }),

      // Fetch user details from API
      fetchUser: async () => {
        try {
          set({ loading: true });
          const data = (await adminService.getUser()) as UserApiResponse;
          if ("error" in data || "statusCode" in data) {
            throw new Error("Invalid user response");
          }
          set({ user: data as AdminUserType, loading: false });
        } catch (error) {
          console.error("❌ Failed to fetch user:", error);
          set({ loading: false });
        }
      },
    }),
    {
      name: LOCAL_STORAGE_NAMES.EMERGING_LEADERS_CURRENT_USER,

      // 🔥 Runs after Zustand rehydrates from storage
      onRehydrateStorage: () => async (state) => {
        if (!state) return;

        try {
          if (state.user) {
            await state.fetchUser();
          } else {
            state.setLoading(false);
          }
        } catch (error) {
          console.error("❌ Failed during rehydration:", error);
          state.setLoading(false);
        }
      },
    }
  )
);
