// stores/useModalStore.ts
import { AdminListType } from "@/app/(admin)/admin/user-management/AdminList";
import { create } from "zustand";

type ModalType =
  | "editAdmin"
  | "resendInvite"
  | "deactivate"
  | "reactivate"
  | null;

interface ModalState {
  modalType: ModalType;
  selectedAdmin: AdminListType | null;
  openModal: (type: ModalType, admin?: AdminListType) => void;
  closeModal: () => void;
}

export const userModalStore = create<ModalState>((set) => ({
  modalType: null,
  selectedAdmin: null,
  openModal: (type, admin) =>
    set({ modalType: type, selectedAdmin: admin || null }),
  closeModal: () => set({ modalType: null, selectedAdmin: null }),
}));
