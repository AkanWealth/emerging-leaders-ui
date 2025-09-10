import { create } from "zustand";

interface UIState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
