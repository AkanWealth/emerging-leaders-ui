import { Button } from "@/components/ui/button";
import { useToastStore } from "@/store/toastStore";
import { userModalStore } from "@/store/userModalStore";
import Image from "next/image";

const ReactivateAdmin = () => {
  const { showToast } = useToastStore();
  const { modalType, selectedAdmin, closeModal } = userModalStore();

  const handleUpdateAdmin = () => {
    try {
      throw Error();
      showToast(
        "success",
        "Admin Reactivated successfully.",
        "Clare Brown’s admin account has been reactivated and access has been fully restored."
      );
    } catch (error) {
      showToast(
        "error",
        "Failed to Reactivate Admin.",
        `We couldn’t reactivate ${selectedAdmin?.full_name} admin access. Please try again later.`
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
            Are you sure you want to reactivate Admin {selectedAdmin?.full_name}
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
            onClick={handleUpdateAdmin}
            className="flex-1  text-[20px] leading-[30px] font-medium  border-none text-[#fff] rounded-[16px] bg-[#A2185A] h-[62px] cursor-pointer hover:bg-[#A2185A]"
          >
            Deactivate Admin
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReactivateAdmin;
