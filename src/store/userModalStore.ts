import { AdminType } from "@/hooks/admin/user-management/Admins/useAdminList";
import { UserType } from "@/hooks/admin/user-management/Users/useUserList";
import { create } from "zustand";

type ModalType =
  | "createAdmin"
  | "editAdmin"
  | "resendInvite"
  | "deactivate"
  | "reactivate"
  | null;

type UserModalType = "reactivateUser" | "deactivateUser" | null;

interface ModalState {
  modalType: ModalType;
  selectedAdmin: AdminType | null;
  openModal: (type: ModalType, admin?: AdminType) => void;
  closeModal: () => void;
}

export const userModalStore = create<ModalState>((set) => ({
  modalType: null,
  selectedAdmin: null,
  openModal: (type, admin) =>
    set({ modalType: type, selectedAdmin: admin || null }),
  closeModal: () => set({ modalType: null, selectedAdmin: null }),
}));

interface UserModalState {
  modalType: UserModalType;
  selectedUser: UserType | null;
  openModal: (type: UserModalType, user?: UserType) => void;
  closeModal: () => void;
}
export const manageUserModalStore = create<UserModalState>((set) => ({
  modalType: null,
  selectedUser: null,
  openModal: (type, user) =>
    set({ modalType: type, selectedUser: user || null }),
  closeModal: () => set({ modalType: null, selectedUser: null }),
}));
