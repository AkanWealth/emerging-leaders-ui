// store/supportStore.ts
import { create } from "zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supportService from "@/services/supportService";
import { TicketStatus } from "@/app/(admin)/admin/support/SupportFilter";
import { supportType } from "@/hooks/admin/support/useSupport";
import { QUERY_KEYS } from "@/react-query/constants";
import { useToastStore } from "./toastStore";
import { SupportStatusList } from "@/app/(admin)/admin/support/StatusBadge";

type ModalType = "viewTicket" | "closeTicket" | "deleteTicket" | null;


interface ModalState {
  modalType: ModalType;
  selectedTicket: supportType | null;
  openModal: (type: ModalType, support?: supportType) => void;
  closeModal: () => void;
  updateTicketStatusLocal: (id: string, status: TicketStatus) => void;
}

export const supportModalStore = create<ModalState>((set, get) => ({
  modalType: null,
  selectedTicket: null,

  openModal: (type, ticket) =>
    set({ modalType: type, selectedTicket: ticket || null }),

  closeModal: () => set({ modalType: null, selectedTicket: null }),

  updateTicketStatusLocal: (id, status: TicketStatus) => {
    const { selectedTicket } = get();
    if (selectedTicket && selectedTicket.id === id) {
      set({
        selectedTicket: {
          ...selectedTicket,
          status,
        },
      });
    }
  },
}));

// 👇 custom hook that gives access to mutation + store
export function useUpdateTicketMutation() {
  const queryClient = useQueryClient();
  const { updateTicketStatusLocal } = supportModalStore();
  const { showToast } = useToastStore();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: TicketStatus;
    }) => {
      return supportService.updateTicketStatus(id, status);
    },
    onSuccess: (data, variables) => {
      // Narrow the type of data before accessing its properties
      if (typeof data === "object" && data !== null && "error" in data) {
        const errorData = data as { error: string };
        if (errorData.error) {
          // 🔴 Treat as an error instead of success
          showToast("error", "Failed to Update Ticket", errorData.error);
          return;
        }
      }

      // ✅ If no error, proceed normally
      updateTicketStatusLocal(variables.id, variables.status);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SUPPORT_TICKETS],
      });

      showToast(
        "success",
        "Ticket Updated Successfully",
        `Ticket ${variables.id} is now ${SupportStatusList[variables.status]}.`
      );
    },
    onError: (err) => {
      showToast(
        "error",
        "Unexpected Error",
        "Something went wrong while updating the ticket."
      );
      console.error(err);
    },
  });
}


// ✅ mutation for deleting a ticket by id
export function useDeleteTicketMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: async (id: string) => {
      return supportService.deleteTicket(id);
    },
    onSuccess: (_, id) => {
      // Optimistically remove the deleted ticket from cache
      queryClient.setQueryData([QUERY_KEYS.SUPPORT_TICKETS], (old: supportType[]) => {
        if (!old) return [];
        return old.filter((ticket: supportType) => ticket.id !== id);
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SUPPORT_TICKETS],
      });

      showToast(
        "success",
        "Ticket Deleted",
        `Ticket ${id} has been deleted successfully.`
      );
    },
    onError: (err) => {
      showToast(
        "error",
        "Failed to Delete Ticket",
        "Something went wrong while deleting the ticket."
      );
      console.error(err);
    },
  });
}

