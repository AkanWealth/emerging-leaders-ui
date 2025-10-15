import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/constants";
import { useToastStore } from "@/store/toastStore";
import userManagementService from "@/services/userManagementService";
import { userModalStore } from "@/store/userModalStore";

export function useAddAdminMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const { closeModal } = userModalStore();

  return useMutation({
    mutationFn: async (payload: {
      firstname: string;
      lastname: string;
      email: string;
      password?: string;
      status?: "ACTIVE" | "PENDING";
    }) => {
      return userManagementService.createAdmin(payload);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (data, variables) => {
      // Narrow type before accessing
      if (typeof data === "object" && data !== null && "error" in data) {
        const errorData = data as { error: string };
        if (errorData.error) {
          showToast(
            "error",
            "Failed to Create Admin.",
            "There was an issue creating the admin. Please check the details and try again."
          );
          return;
        }
        closeModal();
      }

      // ✅ Success flow
      showToast(
        "success",
        "New Admin Created!",
        "An email invitation has been successfully sent to the user."
      );

      // Refresh admin list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FETCH_ADMINS],
      });
      closeModal();
    },

    onError: (err) => {
      console.error(err);
      showToast(
        "error",
        "Failed to Create Admin.",
        "There was an issue creating the admin. Please check the details and try again."
      );
      closeModal();
    },
  });
}
