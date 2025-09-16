"use client";

import { Button } from "@/components/ui/button";
import AuthBackground from "../../shared/Backgrounds/AuthBackground";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { COOKIE_NAMES, setCookie } from "@/utils/cookiesUtils";
import { useAdminCount } from "@/hooks/useAdminCount";
import { Skeleton } from "@/components/ui/skeleton";

const InviteAdminPage = () => {
  const { data, isLoading:loading, error } = useAdminCount();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawEmail = params.get("email");
    const code = params.get("code");

    if (!rawEmail || !code) return;

    setCookie(COOKIE_NAMES.INVITE_EMAIL, rawEmail);
    setCookie(COOKIE_NAMES.INVITE_CODE, code);
  }, []);

  return (
    <main className="flex min-h-screen">
      <section className="hidden md:flex flex-1">
        <AuthBackground />
      </section>

      <section className="flex flex-1 flex-col justify-center items-center p-6 bg-white">
        <div className="w-full max-w-[563px] space-y-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-[16px]">
            <h3 className="text-[32px] font-medium text-[#2A2829]">
              Admin Invitation
            </h3>
            <p className="text-[#928F8B] font-normal text-[16px]">
              You’ve been invited to join as an admin.
            </p>
          </div>

          <section className="bg-[#FFF7E8] flex items-center justify-between p-4 rounded-[12px]">
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-[#2A2829] text-[18px]">
                Emerging Leaders
              </h3>

              <p className="text-[#928F8B] font-normal text-[14px]">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Skeleton className="h-6 w-12 rounded" />
                    <span className="sr-only">Loading admin count</span>
                  </span>
                ) : error ? (
                  <span className="text-[#D23B3B]">Failed to load admins</span>
                ) : (
                  <span>{data} existing admins</span>
                )}
              </p>
            </div>

            <Button
              onClick={() => router.push("/verify")}
              disabled={loading || Boolean(error)}
              className="bg-[#A2185A] hover:bg-inherit hover:text-[#A2185A] hover:border hover:border-[#A2185A] cursor-pointer min-w-[200px] text-[#fff] rounded-[16px] h-[40px] text-[16px] font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Join
            </Button>
          </section>
        </div>
      </section>
    </main>
  );
};

export default InviteAdminPage;
