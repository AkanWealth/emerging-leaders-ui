import { AdminListType } from "@/app/(admin)/admin/user-management/AdminList";
import { UserListType } from "@/app/(admin)/admin/user-management/UserList";
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

interface UserModalState {
  modalType: UserModalType;
  selectedUser: UserListType | null;
  openModal: (type: UserModalType, user?: UserListType) => void;
  closeModal: () => void;
}
export const manageUserModalStore = create<UserModalState>((set) => ({
  modalType: null,
  selectedUser: null,
  openModal: (type, user) =>
    set({ modalType: type, selectedUser: user || null }),
  closeModal: () => set({ modalType: null, selectedUser: null }),
}));
