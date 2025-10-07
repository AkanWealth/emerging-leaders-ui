import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/react-query/constants";
import { useToastStore } from "@/store/toastStore";
import userManagementService from "@/services/userManagementService";
import { UserType } from "./useUserList";

type ActionType = "DEACTIVATE" | "REACTIVATE";

export function useToggleUserStatusMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  return useMutation({
    mutationFn: async ({
      id,
      action,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      user,
    }: {
      id: string;
      action: ActionType;
      user: UserType;
    }) => {
      if (action === "DEACTIVATE") {
        return userManagementService.deactivateUser(id);
      } else if (action === "REACTIVATE") {
        return userManagementService.reactivateUser(id);
      }
      throw new Error("Invalid action type provided");
    },

    onSuccess: (data, variables) => {
      if (typeof data === "object" && data !== null && "error" in data) {
        const errorData = data as { error: string };
        if (errorData.error) {
          const errorHeading =
            variables.action === "DEACTIVATE"
              ? "Failed to Deactivate User."
              : "Admin Reactivated successfully.";

          const errorMsg =
            variables.action === "DEACTIVATE"
              ? `We couldn’t deactivate ${
                  variables.user?.firstname && variables.user.lastname
                    ? variables.user?.firstname + " " + variables.user?.lastname
                    : variables.user?.email
                }’s access. Please try again later.`
              : `We couldn’t reactivate ${
                  variables.user?.firstname && variables.user.lastname
                    ? variables.user?.firstname + " " + variables.user?.lastname
                    : variables.user?.email
                }’s access. Please try again later.
                
                `;

          showToast("error", errorHeading, errorMsg);
          return;
        }
      }
      const messageHeading =
        variables.action === "DEACTIVATE"
          ? "User Deactivated successfully."
          : "User Reactivated successfully.";

      const message =
        variables.action === "DEACTIVATE"
          ? `${
              variables.user?.firstname && variables.user.lastname
                ? variables.user?.firstname + " " + variables.user?.lastname
                : variables.user?.email
            }’s account is now deactivated and access has been restricted.`
          : `${
              variables.user?.firstname && variables.user.lastname
                ? variables.user?.firstname + " " + variables.user?.lastname
                : variables.user?.email
            }’s account has been reactivated and access has been fully restored.
            `;

      showToast("success", messageHeading, message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FETCH_USERS],
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
