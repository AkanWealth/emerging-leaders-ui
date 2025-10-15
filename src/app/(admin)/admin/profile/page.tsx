"use client";
import AddressInfoForm from "./AddressInfoForm";
import BackButton from "./BackButton";
import PersonalInformationForm from "./PersonalInformationForm";

import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "./UserAvatar";

import clsx from "clsx";
import { useUserStore } from "@/store/userStore";

const ProfilePage = () => {
  const { user, loading } = useUserStore();

  return (
    <div className="flex flex-col gap-6 h-full">
      <section className="flex flex-col gap-6">
        <section className="flex gap-4">
          <BackButton />
          <div>
            <SectionTitle className="text-2xl">My Profile</SectionTitle>
            <p className="text-muted-foreground">
              Your personal and professional details at a glance
            </p>
          </div>
        </section>

        <UserAvatar
          userId={user?.id as string}
          loading={loading}
          src={
            user?.profilePicture && user?.profilePicture !== ""
              ? user.profilePicture
              : `https://ui-avatars.com/api/?name=${user?.firstname}&background=000000&color=fff`
          }
          alt={
            user?.firstname
              ? user.firstname + " " + user.lastname
              : "User's name"
          }
          title={
            user?.firstname
              ? user?.firstname + " " + user?.lastname
              : user?.email
          }
          className="size-19"
        />
      </section>
      <ScrollArea className="flex-1 overflow-y-auto h-full">
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
