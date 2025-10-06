"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userModalStore } from "@/store/userModalStore";
import { useAddAdminMutation } from "@/hooks/admin/user-management/Admins/useAddAdminMutation";

const CreateAdmin = () => {
  const { closeModal } = userModalStore();
  const addAdminMutation = useAddAdminMutation();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  // simple regex pattern for validating email
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    addAdminMutation.mutate(
      {
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
        email: form.email.trim(),
      },
      {
        onSettled: () => closeModal(),
      }
    );
  };

  const isSubmitDisabled =
    !form.email || !isValidEmail(form.email) || addAdminMutation.isPending;

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

      <form onSubmit={handleAddAdmin} className="flex flex-col gap-[64px]">
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
                placeholder="Enter admin’s first name"
                value={form.firstname}
                onChange={handleChange}
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
                placeholder="Enter admin’s last name"
                value={form.lastname}
                onChange={handleChange}
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
              placeholder="Enter admin’s email address"
              value={form.email}
              onChange={handleChange}
              className={`h-12 w-full text-[16px] rounded-[12px] border px-4 outline-none ${
                form.email && !isValidEmail(form.email)
                  ? "border-red-500"
                  : "border-[#B1B1AE]"
              }`}
            />
          </div>
        </div>

        <div className="flex">
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className={`flex-1 text-[20px] leading-[30px] font-medium border-none text-[#fff] rounded-[16px] h-[62px] cursor-pointer ${
              isSubmitDisabled
                ? "bg-[#A2185A]/50 cursor-not-allowed"
                : "bg-[#A2185A] hover:bg-[#A2185A]/90"
            }`}
          >
            {addAdminMutation.isPending ? "Creating..." : "Create Admin"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateAdmin;
