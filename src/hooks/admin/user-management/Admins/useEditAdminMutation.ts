import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/constants";
import { useToastStore } from "@/store/toastStore";
import userManagementService from "@/services/userManagementService";
import { AdminType } from "./useAdminList";
import { userModalStore } from "@/store/userModalStore";

export function useEditAdminMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const { closeModal } = userModalStore();

  return useMutation({
    mutationFn: async ({
      adminId,
      payload,
    }: {
      adminId: string;
      payload: {
        firstname?: string;
        lastname?: string;
        email: string;
      };
    }) => {
      return userManagementService.editAdmin(adminId, payload);
    },

    onSuccess: (data, variables) => {
      // Handle API error format
      if (typeof data === "object" && data !== null && "error" in data) {
        const errorData = data as { error: string };
        if (errorData.error) {
          showToast(
            "error",
            "Failed to Save Changes.",
            "We couldn’t update the user’s details. Please check the information and try again."
          );
          closeModal();

          return;
        }
      }

      // ✅ Show success toast
      showToast(
        "success",
        "Changes saved successfully.",
        `User profile has been updated with the new information.`
      );

      // ✅ Update admin list cache immediately (optimistic UI)
      queryClient.setQueryData(
        [QUERY_KEYS.FETCH_ADMINS],
        (oldData: { data: AdminType[] }) => {
          if (!oldData || !oldData.data) return oldData;

          const updatedAdmins = oldData.data.map((admin: AdminType) =>
            admin.id === variables.adminId
              ? { ...admin, ...variables.payload }
              : admin
          );

          return {
            ...oldData,
            data: updatedAdmins,
          };
        }
      );
      closeModal();

      // ✅ Optionally, re-fetch to ensure data consistency with backend
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FETCH_ADMINS],
      });
    },

    onError: (error) => {
      console.error(error);
      showToast(
        "error",
        "Update Failed",
        "We couldn’t update the admin information. Please try again later."
      );
      closeModal();
    },
  });
}
