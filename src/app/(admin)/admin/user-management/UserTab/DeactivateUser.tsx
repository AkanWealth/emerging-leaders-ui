import { Button } from "@/components/ui/button";
import { useToastStore } from "@/store/toastStore";
import { manageUserModalStore } from "@/store/userModalStore";
import Image from "next/image";

const DeactivateUser = () => {
  const { showToast } = useToastStore();
  const { selectedUser, closeModal } = manageUserModalStore();

  const handleUpdateAdmin = () => {
    try {
      //   throw Error();
      showToast(
        "success",
        "User Deactivated successfully.",
        `${selectedUser?.full_name}’s account is now deactivated and access has been restricted.`
      );
    } catch (error) {
      showToast(
        "error",
        "Failed to Deactivate User.",
        `We couldn’t deactivate ${selectedUser?.full_name} access. Please try again later.`
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
          src="/user-management/deactivate.svg"
          alt="Deactivate Icon"
          width={240}
          height={240}
        />
      </div>
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[20px]">
          <aside className="flex flex-col gap-[4px] ">
            <h3 className="text-[24px] leading-[36px] font-semibold">
              Deactivate User
            </h3>
            <p className="text-[#65605C] text-[16px] leading-[24px]">
              Deactivating a user will temporarily suspend their access. You can
              reactivate their account at any time if access is needed again.
            </p>
          </aside>
          <h3 className="text-[#2A2829] text-[20px] leading-[30px] font-medium">
            Are you sure you want to deactivate User {selectedUser?.full_name}?
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
            onClick={handleUpdateAdmin}
            className="flex-1  text-[20px] leading-[30px] font-medium  border-none text-[#fff] rounded-[16px] bg-[#E81313] h-[62px] cursor-pointer hover:bg-[#E81313]"
          >
            Deactivate User
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeactivateUser;
