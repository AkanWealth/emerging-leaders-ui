"use client";
import React from "react";
import AuthBackground from "../../shared/Backgrounds/AuthBackground";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  return (
    <main className="flex min-h-screen">
      <section className="hidden md:flex flex-1">
        <AuthBackground />
      </section>

      <section className="flex flex-1 flex-col justify-center items-center p-6 bg-white">
        <div className="w-full max-w-[563px] space-y-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-[16px]">
            <Image
              src="/AuthSuccess.svg"
              alt="Success"
              width={80}
              height={83}
            />
            <h3 className="text-[32px] font-medium text-[#2A2829]">
              Verification Successful
            </h3>
            <p className="text-[#928F8B] font-normal text-[16px]">
              Your invitation has been verified. You can now set up your
              account.
            </p>
          </div>

          <Button
            onClick={() => router.push("/set-up")}
            className="bg-[#A2185A] cursor-pointer min-w-[200px] text-[#fff] rounded-[16px] h-[50px] text-[16px] font-medium"
          >
            Set up account
          </Button>
        </div>
      </section>
    </main>
  );
};

export default SuccessPage;
