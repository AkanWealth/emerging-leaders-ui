import { create } from "zustand";

type ToastType = "success" | "error" | "warning";

interface ToastState {
  isOpen: boolean;
  type: ToastType;
  heading: string;
  description: string;
  duration: number;
  showToast: (
    type: ToastType,
    heading: string,
    description: string,
    duration?: number
  ) => void;
  closeToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isOpen: false,
  type: "success",
  heading: "",
  description: "",
  duration: 5000,
  showToast: (type, heading, description, duration = 5000) =>
    set({
      isOpen: true,
      type,
      heading,
      description,
      duration,
    }),
  closeToast: () =>
    set({
      isOpen: false,
      heading: "",
      description: "",
    }),
}));
