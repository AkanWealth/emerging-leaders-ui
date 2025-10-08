import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/constants";
import { useToastStore } from "@/store/toastStore";
import userManagementService from "@/services/userManagementService";
import { AdminType } from "./useAdminList";
import { userModalStore } from "@/store/userModalStore";
type ApiResponseType = {
  error?: string;
  statusCode?: string | number;
};

export function useDeleteAdminMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const { closeModal } = userModalStore();

  return useMutation({
    mutationFn: async ({
      adminId,
    }: {
      adminId: string;
      firstname?: string;
      lastname?: string;
      email: string;
    }) => {
      const response = (await userManagementService.deleteAdmin(
        adminId
      )) as ApiResponseType;

      // ❌ Treat as error if response contains EITHER `statusCode` OR `error`
      if (response?.statusCode || response?.error) {
        throw new Error(response?.error || "Unexpected error occurred");
      }

      // ✅ Otherwise, treat as success
      return response;
    },

    onSuccess: (_data, variables) => {
      const adminName =
        variables.firstname && variables.lastname
          ? `${variables.firstname} ${variables.lastname}`
          : variables.email;

      showToast(
        "success",
        "Admin Deleted successfully.",
        `${adminName} has been removed from the admin list.`
      );

      // ✅ Update local cache
      queryClient.setQueryData(
        [QUERY_KEYS.FETCH_ADMINS],
        (oldData: { data?: AdminType[] } | undefined) => {
          if (!oldData || !oldData.data) return oldData;

          const updatedAdmins = oldData.data.filter(
            (admin) => admin.id !== variables.adminId
          );

          return { ...oldData, data: updatedAdmins };
        }
      );

      // ✅ Revalidate to stay in sync with backend
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FETCH_ADMINS] });
      closeModal();
    },

    onError: (_error, variables) => {
      const adminName =
        variables.firstname && variables.lastname
          ? `${variables.firstname} ${variables.lastname}`
          : variables.email;

      showToast(
        "error",
        "Failed to Delete Admin.",
        `We couldn’t remove ${adminName} from the admin list. Please try again later.`
      );

      closeModal();
    },
  });
}
