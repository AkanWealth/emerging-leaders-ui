import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/constants";
import { useToastStore } from "@/store/toastStore";
import userManagementService from "@/services/userManagementService";
import { AdminType } from "./useAdminList";

type ActionType = "DEACTIVATE" | "REACTIVATE";

export function useToggleAdminStatusMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: async ({
      id,
      action,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      admin,
    }: {
      id: string;
      action: ActionType;
      admin: AdminType;
    }) => {
      if (action === "DEACTIVATE") {
        return userManagementService.deactivateAdmin(id);
      } else if (action === "REACTIVATE") {
        return userManagementService.reactivateAdmin(id);
      }
      throw new Error("Invalid action type provided");
    },

    onSuccess: (data, variables) => {
      if (typeof data === "object" && data !== null && "error" in data) {
        const errorData = data as { error: string };
        if (errorData.error) {
          const errorHeading =
            variables.action === "DEACTIVATE"
              ? "Failed to Deactivate Admin."
              : "Admin Reactivated successfully.";

          const errorMsg =
            variables.action === "DEACTIVATE"
              ? `We couldn’t deactivate ${
                  variables.admin?.firstname && variables.admin.lastname
                    ? variables.admin?.firstname +
                      " " +
                      variables.admin?.lastname
                    : variables.admin?.email
                }’s  admin access. Please try again later.`
              : `We couldn’t reactivate ${
                  variables.admin?.firstname && variables.admin.lastname
                    ? variables.admin?.firstname +
                      " " +
                      variables.admin?.lastname
                    : variables.admin?.email
                }’s  admin access. Please try again later.`;

          showToast("error", errorHeading, errorMsg);
          return;
        }
      }
      const messageHeading =
        variables.action === "DEACTIVATE"
          ? "Admin Deactivated successfully."
          : "Admin Reactivated successfully.";

      const message =
        variables.action === "DEACTIVATE"
          ? `${
              variables.admin?.firstname && variables.admin.lastname
                ? variables.admin?.firstname + " " + variables.admin?.lastname
                : variables.admin?.email
            }’s admin account is now deactivated and access has been restricted.`
          : `${
              variables.admin?.firstname && variables.admin.lastname
                ? variables.admin?.firstname + " " + variables.admin?.lastname
                : variables.admin?.email
            }’s admin account has been reactivated and access has been fully restored.`;

      showToast("success", messageHeading, message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FETCH_ADMINS],
      });
    },

    onError: (err) => {
      console.error(err);
      showToast(
        "error",
        "Status Update Failed.",
        "There was an issue updating the admin’s status. Please try again."
      );
    },
  });
}
