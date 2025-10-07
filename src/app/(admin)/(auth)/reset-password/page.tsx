"use client";
import React, { useState } from "react";
import AuthBackground from "../../../../shared/Backgrounds/AuthBackground";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrengthMeter from "../../../../shared/Meter/PasswordStrengthMeter";
import { Button } from "@/components/ui/button";
import authService from "@/services/authServices";
import { useRouter, useSearchParams } from "next/navigation";
import { useToastStore } from "@/store/toastStore";
import { BeatLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

type ResetPasswordResponse = {
  error?: string;
  message: string;
};

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const emailFromQuery = searchParams?.get("email") ?? "";
  const codeFromQuery = searchParams?.get("code") ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast } = useToastStore();

  const isMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isMismatch) return;

    setIsLoading(true);
    try {
      const response = (await authService.changePassword({
        email: emailFromQuery,
        otp: codeFromQuery || "",
        newPassword: password,
        confirmNewPassword: confirmPassword,
      })) as ResetPasswordResponse;
      if (response.error) {
        throw new Error("Password Reset Failed");
      }
      showToast(
        "success",
        "Password reset successful",
        "You can now login with your new credentials."
      );
      router.push("/sign-in");
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "An unexpected error occurred";
      showToast(
        "error",
        errorMessage,
        "We couldn’t reset your password. Please check your reset link or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen">
      <section className="hidden md:flex flex-1">
        <AuthBackground />
      </section>

      <section className="flex flex-1 flex-col justify-center items-center p-6 bg-white">
        <div className="w-full max-w-[563px] space-y-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-[16px]">
            <h3 className="text-[32px] font-medium text-[#2A2829]">
              Create New Password
            </h3>
            <p className="text-[#928F8B] font-normal text-[16px]">
              Enter a password different from the previous one.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handlePasswordReset}>
            <div className="grid gap-2">
              <Label
                className="text-[18px] font-medium text-[#2A2829]"
                htmlFor="password"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="h-12 text-[16px] rounded-[12px] border-[#B1B1AE] px-4 pr-10 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65605C] cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {password.length >= 1 && (
                <PasswordStrengthMeter password={password} />
              )}
            </div>

            <div className="grid gap-2 mt-2.5">
              <Label
                className="text-[18px] font-medium text-[#2A2829]"
                htmlFor="confirm-password"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <motion.div
                  animate={{
                    borderColor: isMismatch ? "#E81313" : "#B1B1AE",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-[12px] border px-4 pr-10`}
                >
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    placeholder="Rewrite your password"
                    className="h-12 text-[16px] w-full outline-none border-none bg-transparent"
                  />
                </motion.div>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65605C] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {isMismatch && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#E81313] text-[1rem] leading-[24px] font-normal mt-1"
                  >
                    Password does not match
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              disabled={
                isLoading || !password || !confirmPassword || isMismatch
              }
              className="h-12 w-full bg-[#A2185A] hover:bg-[#8f1450] cursor-pointer rounded-[12px] text-[18px] font-medium text-white mt-11 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <BeatLoader size={8} color="#fff" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
