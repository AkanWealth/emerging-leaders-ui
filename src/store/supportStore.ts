import { supportType } from "@/app/(admin)/admin/support/SupportTable";
import { create } from "zustand";

type ModalType = "viewTicket" | "closeTicket" | "deleteTicket" | null;
interface ModalState {
  modalType: ModalType;
  selectedTicket: supportType | null;
  openModal: (type: ModalType, support?: supportType) => void;
  closeModal: () => void;
}

export const supportModalStore = create<ModalState>((set) => ({
  modalType: null,
  selectedTicket: null,
  openModal: (type, ticket) =>
    set({ modalType: type, selectedTicket: ticket || null }),
  closeModal: () => set({ modalType: null, selectedTicket: null }),
}));
