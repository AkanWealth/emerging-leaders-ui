import { Button } from "@/components/ui/button";
import { useDeleteAdminMutation } from "@/hooks/admin/user-management/Admins/useDeleteAdminMutation";
import { useToastStore } from "@/store/toastStore";
import { userModalStore } from "@/store/userModalStore";
import Image from "next/image";
import { BeatLoader } from "react-spinners";

const DeleteAdmin = () => {
  const { showToast } = useToastStore();
  const { selectedAdmin, closeModal } = userModalStore();
  const { mutate: deleteAdmin, isPending } = useDeleteAdminMutation();

  const handleUpdateAdmin = () => {
    //   throw Error();
    if (!selectedAdmin) {
      showToast(
        "error",
        "No User Selected.",
        "Please select an user before performing this action."
      );
      return;
    }
    deleteAdmin({
      adminId: selectedAdmin.id,
      firstname: selectedAdmin.firstname,
      lastname: selectedAdmin.lastname,
      email: selectedAdmin.email,
    });
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
              Delete Admin User
            </h3>
            <p className="text-[#65605C] text-[16px] leading-[24px]">
              Deleting an admin will permanently remove their access. To restore
              access, you’ll need to send them a new invitation.
            </p>
          </aside>
          <h3 className="text-[#2A2829] text-[20px] leading-[30px] font-medium">
            Are you sure you want to permanently delete{" "}
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
            onClick={handleUpdateAdmin}
            className="flex-1  text-[20px] leading-[30px] font-medium  border-none text-[#fff] rounded-[16px] bg-[#E81313] h-[62px] cursor-pointer hover:bg-[#E81313]"
          >
            {isPending ? (
              <BeatLoader size={8} color="#fff" />
            ) : (
              "Deactivate User"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeleteAdmin;
