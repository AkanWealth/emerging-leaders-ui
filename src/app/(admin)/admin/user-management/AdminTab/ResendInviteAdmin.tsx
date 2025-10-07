import { Button } from "@/components/ui/button";
import userManagementService from "@/services/userManagementService";
import { useToastStore } from "@/store/toastStore";
import { userModalStore } from "@/store/userModalStore";
import Image from "next/image";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

type ResendAdminInviteResponse = {
  error?: string;
  message?: string;
};

const ResendInviteAdmin = () => {
  const { showToast } = useToastStore();
  const { selectedAdmin, closeModal } = userModalStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleResendInviteAdmin = async () => {
    try {
      setIsLoading(true);
      const response = (await userManagementService.resendAdminInvite(
        selectedAdmin?.email || ""
      )) as ResendAdminInviteResponse;
      if (response && "error" in response) {
        throw new Error(response.error);
      }
      showToast(
        "success",
        "Admin invite sent successfully.",
        `An invitation has been sent to ${
          selectedAdmin?.firstname + " " + selectedAdmin?.lastname
        } to activate their account.`
      );
    } catch (error) {
      showToast(
        "error",
        "Failed to send Admin Invite",
        `We couldn’t send the invitation to ${
          selectedAdmin?.firstname + " " + selectedAdmin?.lastname
        }. Please try again later.`
      );
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <section className="flex flex-col gap-[40px] py-[30px] px-[40px]">
      <div className="flex items-center justify-center flex-col">
        <Image
          src="/user-management/resendInvite.svg"
          alt="Deactivate Icon"
          width={240}
          height={240}
        />
      </div>
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[20px]">
          <aside className="flex flex-col gap-[4px] ">
            <h3 className="text-[24px] leading-[36px] font-semibold">
              Resend Admin Invite
            </h3>
            <p className="text-[#65605C] text-[16px] leading-[24px]">
              Send a new invitation email to the admin to grant access.
            </p>
          </aside>
          <h3 className="text-[#2A2829] text-[20px] leading-[30px] font-medium">
            Do you want to resend the invite to Admin{" "}
            {selectedAdmin?.firstname && selectedAdmin.lastname
              ? selectedAdmin?.firstname + " " + selectedAdmin?.lastname
              : selectedAdmin?.email}
            ?
          </h3>
        </div>

        <div className="flex gap-[12px] ">
          <Button
            onClick={closeModal}
            className="flex-1  text-[20px] leading-[30px] font-medium border border-[#A2185A] text-[#A2185A] rounded-[16px] bg-white h-[62px] cursor-pointer hover:bg-white"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleResendInviteAdmin}
            className="flex-1  text-[20px] leading-[30px] font-medium  border-none text-[#fff] rounded-[16px] bg-[#A2185A] h-[62px] cursor-pointer hover:bg-[#A2185A]"
          >
            {isLoading ? <BeatLoader size={8} color="#fff" /> : "Resend Invite"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResendInviteAdmin;
