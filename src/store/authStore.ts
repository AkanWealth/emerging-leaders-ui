import { create } from "zustand";
import { getCookie, COOKIE_NAMES } from "@/utils/cookiesUtils";

interface AuthState {
  isAuthenticated: boolean;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  // Check if user is authenticated by reading from cookies
  checkAuth: () => {
    const tokens = getCookie(COOKIE_NAMES.ADMIN_AUTH_TOKENS);
    const isAuth = !!tokens;
    set({ isAuthenticated: isAuth });
    return isAuth;
  },
}));
