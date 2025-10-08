"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToastStore } from "@/store/toastStore";
import { userModalStore } from "@/store/userModalStore";
import { useEditAdminMutation } from "@/hooks/admin/user-management/Admins/useEditAdminMutation";
import { BeatLoader } from "react-spinners";
// import userService from "@/services/userService"; // if you have one

const EditAdmin = () => {
  const { showToast } = useToastStore();
  const { selectedAdmin, closeModal } = userModalStore();
  const { mutate: editAdmin, isPending } = useEditAdminMutation();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  // Prefill when modal opens or admin changes
  useEffect(() => {
    if (selectedAdmin) {
      setFormData({
        firstname: selectedAdmin.firstname || "",
        lastname: selectedAdmin.lastname || "",
        email: selectedAdmin.email || "",
      });
    }
  }, [selectedAdmin]);
  console.log("Selected Admin:", selectedAdmin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin) {
      showToast(
        "error",
        "No Admin Selected.",
        "Please select an admin before performing this action."
      );
      return;
    }
    editAdmin({
      adminId: selectedAdmin.id,
      payload: {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
      },
    });
  };

  const handleDeleteAdmin = async () => {
    try {
      // Example delete call
      // await userService.deleteAdmin(selectedAdmin._id);

      showToast(
        "success",
        "Admin deleted successfully.",
        `${formData.firstname} ${formData.lastname} has been removed.`
      );
      closeModal();
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to Delete.", "Something went wrong.");
    }
  };

  return (
    <section className="flex flex-col gap-[40px] py-[30px] px-[40px]">
      <aside className="flex flex-col gap-[4px] ">
        <h3 className="text-[24px] leading-[36px] font-semibold">
          Edit Admin User
        </h3>
        <p className="text-[#65605C] text-[16px] leading-[24px]">
          Update the details below to modify this admin’s information.
        </p>
      </aside>

      <form onSubmit={handleUpdateAdmin} className="flex flex-col gap-[64px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col md:flex-row gap-[32px]">
            <div className="grid gap-[4px] w-[350px] text-[#2A2829]">
              <Label
                className="text-[20px] leading-[30px] font-medium"
                htmlFor="firstname"
              >
                User’s First Name
              </Label>
              <Input
                type="text"
                id="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="User’s First Name"
                className="h-12 text-[16px] rounded-[12px] border-[#B1B1AE] px-4 outline-none"
              />
            </div>

            <div className="grid gap-[4px] w-[350px] text-[#2A2829]">
              <Label
                className="text-[20px] leading-[30px] font-medium"
                htmlFor="lastname"
              >
                User’s Last Name
              </Label>
              <Input
                type="text"
                id="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="User’s Last Name"
                className="h-12 text-[16px] rounded-[12px] border-[#B1B1AE] px-4 outline-none"
              />
            </div>
          </div>

          <div className="flex-1 grid gap-[4px]">
            <Label
              className="text-[20px] font-medium text-[#2A2829]"
              htmlFor="email"
            >
              Email Address <span className="text-[#E81313]">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="User’s Email Address"
              className="h-12 w-full text-[16px] rounded-[12px] border-[#B1B1AE] px-4 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-[12px]">
          <Button
            type="button"
            onClick={handleDeleteAdmin}
            className="flex-1 text-[20px] leading-[30px] font-medium border border-[#E81313] text-[#E81313] rounded-[16px] bg-white h-[62px] cursor-pointer hover:bg-white"
          >
            Delete Admin
          </Button>

          <Button
            disabled={isPending}
            type="submit"
            className="flex-1 text-[20px] leading-[30px] font-medium border-none text-[#fff] rounded-[16px] bg-[#A2185A] h-[62px] cursor-pointer hover:bg-[#A2185A]"
          >
            {isPending ? <BeatLoader size={8} color="#fff" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditAdmin;
