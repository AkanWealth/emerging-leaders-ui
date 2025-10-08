import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/constants";
import { useToastStore } from "@/store/toastStore";
import userManagementService from "@/services/userManagementService";
import { AdminType } from "./useAdminList";

export function useEditAdminMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

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
            "Failed to Update Admin",
            "There was an issue updating the admin details. Please try again."
          );
          return;
        }
      }

      // ✅ Show success toast
      showToast(
        "success",
        "Admin Updated Successfully",
        `${
          variables.payload.firstname || "The admin"
        }’s information has been updated.`
      );

      // ✅ Update admin list cache immediately (optimistic UI)
      queryClient.setQueryData([QUERY_KEYS.FETCH_ADMINS], (oldData: { data: AdminType[]; }) => {
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
      });

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
    },
  });
}
