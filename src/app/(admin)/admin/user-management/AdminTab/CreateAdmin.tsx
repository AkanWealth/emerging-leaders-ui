"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToastStore } from "@/store/toastStore";
import { userModalStore } from "@/store/userModalStore";

const CreateAdmin = () => {
  const { showToast } = useToastStore();
  const { closeModal } = userModalStore();

  const handleUpdateAdmin = () => {
    try {
      throw Error();
      showToast(
        "success",
        "Changes saved successfully.",
        "User profile has been updated with the new information."
      );
    } catch (error) {
      showToast(
        "error",
        "Failed to Save Changes.",
        "We couldn’t update the user’s details. Please check the information and try again."
      );
      console.log(error);
    } finally {
      closeModal();
    }
  };
  const handleDeleteAdmin = () => {
    try {
      showToast(
        "success",
        "Changes saved successfully.",
        "User profile has been updated with the new information."
      );
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };
  return (
    <section className="flex flex-col gap-[40px] py-[30px] px-[40px]">
      <aside className="flex flex-col gap-[4px] ">
        <h3 className="text-[24px] leading-[36px] font-semibold">
          Create Admin User
        </h3>
        <p className="text-[#65605C] text-[16px] leading-[24px]">
          Enter the details below to set up a new admin.
        </p>
      </aside>

      <form className="flex flex-col gap-[64px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col md:flex-row gap-[32px]">
            <div className="grid gap-[4px] w-[350px] text-[#2A2829]">
              {" "}
              {/* increased width */}
              <Label
                className="text-[20px] leading-[30px] font-medium"
                htmlFor="first_name"
              >
                User’s First Name
              </Label>
              <Input
                type="text"
                id="first_name"
                placeholder="Enter admin’s first name"
                className="h-12 text-[16px] rounded-[12px] border-[#B1B1AE] px-4 outline-none"
              />
            </div>

            <div className="grid gap-[4px] w-[350px] text-[#2A2829]">
              {" "}
              {/* increased width */}
              <Label
                className="text-[20px] leading-[30px] font-medium"
                htmlFor="last_name"
              >
                User’s Last Name
              </Label>
              <Input
                type="text"
                id="last_name"
                placeholder="Enter admin’s last name"
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
              type="text"
              id="last_name"
              placeholder="Enter admin’s email address"
              className="h-12 w-full text-[16px] rounded-[12px] border-[#B1B1AE] px-4 outline-none"
            />
          </div>
        </div>
        <div className="flex  ">
          <Button
            onClick={handleUpdateAdmin}
            className="flex-1  text-[20px] leading-[30px] font-medium  border-none text-[#fff] rounded-[16px] bg-[#A2185A] h-[62px] cursor-pointer hover:bg-[#A2185A]"
          >
            Create Admin
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateAdmin;
