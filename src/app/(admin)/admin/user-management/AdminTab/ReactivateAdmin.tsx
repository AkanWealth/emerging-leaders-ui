import { Button } from "@/components/ui/button";
import { AdminType } from "@/hooks/admin/user-management/Admins/useAdminList";
import { useToggleAdminStatusMutation } from "@/hooks/admin/user-management/Admins/useToggleAdminStatusMutation";
import { useToastStore } from "@/store/toastStore";
import { userModalStore } from "@/store/userModalStore";
import Image from "next/image";
import { BeatLoader } from "react-spinners";

const ReactivateAdmin = () => {
  const { showToast } = useToastStore();
  const { selectedAdmin, closeModal } = userModalStore();
  const { mutate: toggleStatus, isPending } = useToggleAdminStatusMutation();

  const handleUpdateAdmin = () => {
    if (!selectedAdmin) {
      showToast(
        "error",
        "No Admin Selected.",
        "Please select an admin before performing this action."
      );
      return;
    }
    try {
      toggleStatus({
        id: selectedAdmin.id,
        action: "REACTIVATE",
        admin: selectedAdmin as AdminType,
      });
    } catch (error) {
      showToast(
        "error",
        "Failed to Reactivate Admin.",
        `We couldn’t reactivate ${
          selectedAdmin?.firstname && selectedAdmin.lastname
            ? selectedAdmin?.firstname + " " + selectedAdmin?.lastname
            : selectedAdmin?.email
        }
        } admin access. Please try again later.`
      );
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return (
    <section className="flex flex-col gap-[40px] py-[30px] px-[40px]">
      <div className="flex items-center justify-center flex-col">
        <Image
          src="/user-management/reactivate.svg"
          alt="Deactivate Icon"
          width={240}
          height={240}
        />
      </div>
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[20px]">
          <aside className="flex flex-col gap-[4px] ">
            <h3 className="text-[24px] leading-[36px] font-semibold">
              Reactivate Admin User
            </h3>
            <p className="text-[#65605C] text-[16px] leading-[24px]">
              Reactivating an admin will restore their access immediately. They
              can now log in and manage the platform as before.
            </p>
          </aside>
          <h3 className="text-[#2A2829] text-[20px] leading-[30px] font-medium">
            Are you sure you want to reactivate Admin{" "}
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
            disabled={isPending}
            onClick={handleUpdateAdmin}
            className="flex-1  text-[20px] leading-[30px] font-medium  border-none text-[#fff] rounded-[16px] bg-[#A2185A] h-[62px] cursor-pointer hover:bg-[#A2185A]"
          >
            {isPending ? (
              <BeatLoader size={8} color="#fff" />
            ) : (
              "Reactivate Admin"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReactivateAdmin;
