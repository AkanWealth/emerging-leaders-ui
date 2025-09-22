"use client";

import AddressInfoForm from "./AddressInfoForm";
import BackButton from "./BackButton";
import PersonalInformationForm from "./PersonalInformationForm";

import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "./UserAvatar";
import clsx from "clsx";

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <section className="flex gap-4">
        <BackButton />
        <div>
          <SectionTitle className="text-2xl">My Profile</SectionTitle>
          <p className="text-muted-foreground">
            Your personal and professional details at a glance
          </p>
        </div>
      </section>

      <section className="flex items-center gap-4 bg-white px-12 py-6 rounded-[12px]">
        <UserAvatar className="size-19" />
        <div>
          <SectionTitle>Kayode White</SectionTitle>

          <p className="text-muted-foreground">Admin</p>
        </div>
      </section>

      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-[12px]">
            <PersonalInformationForm />
          </section>

          <section className="bg-white p-6 rounded-lg">
            <AddressInfoForm />
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProfilePage;

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionTitle = ({ children, className }: SectionTitleProps) => (
  <h4 className={clsx("font-semibold", className)}>{children}</h4>
);
