import { Button } from "@/components/ui/button";
import { useToggleUserStatusMutation } from "@/hooks/admin/user-management/Users/useToogleUserStatusMutation";
import { useToastStore } from "@/store/toastStore";
import { manageUserModalStore } from "@/store/userModalStore";
import Image from "next/image";
import { BeatLoader } from "react-spinners";

const ReactivateUser = () => {
  const { showToast } = useToastStore();
  const { selectedUser, closeModal } = manageUserModalStore();
  const { mutate: toggleStatus, isPending } = useToggleUserStatusMutation();

  const handleUpdateAdmin = () => {
    try {
      //   throw Error();
      if (!selectedUser) {
        showToast(
          "error",
          "No User Selected.",
          "Please select an user before performing this action."
        );
        return;
      }
      toggleStatus({
        id: selectedUser.id,
        action: "REACTIVATE",
        user: selectedUser,
      });
    } catch (error) {
      showToast(
        "error",
        "Failed to Reactivate User.",
        `We couldn’t reactivate ${
          selectedUser?.firstname && selectedUser.lastname
            ? selectedUser?.firstname + " " + selectedUser?.lastname
            : selectedUser?.email
        } access. Please try again later.`
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
              Reactivate User
            </h3>
            <p className="text-[#65605C] text-[16px] leading-[24px]">
              Reactivating a user will restore their access immediately. They
              can now log in and use the platform as before.
            </p>
          </aside>
          <h3 className="text-[#2A2829] text-[20px] leading-[30px] font-medium">
            Are you sure you want to reactivate User{" "}
            {selectedUser?.firstname && selectedUser.lastname
              ? selectedUser?.firstname + " " + selectedUser?.lastname
              : selectedUser?.email}
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
              "Reactivate User"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReactivateUser;
