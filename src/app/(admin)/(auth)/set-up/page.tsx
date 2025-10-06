"use client";
import React, { useState } from "react";
import AuthBackground from "../../../../shared/Backgrounds/AuthBackground";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import PasswordStrengthMeter from "../../shared/Meter/PasswordStrengthMeter";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import authService from "@/services/authServices";
import { COOKIE_NAMES, getCookie } from "@/utils/cookiesUtils";
import { useToastStore } from "@/store/toastStore";
import { BeatLoader } from "react-spinners";
type ResetPasswordResponse = {
  error?: boolean;
  message?: string;
  [key: string]: unknown;
};

const SetUpAdminPasswordPage = () => {
  const router = useRouter();
  const { showToast } = useToastStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminPasswordSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = getCookie(COOKIE_NAMES.INVITE_EMAIL);

      if (password !== confirmPassword) {
        showToast(
          "error",
          "Passwords do not match",
          "Please make sure your password and confirm password fields are the same."
        );
        setLoading(false);
        return;
      }

      const response = (await authService.resetPassword({
        email,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      })) as ResetPasswordResponse;

      // Type guard for response
      if (
        typeof response === "object" &&
        response !== null &&
        "error" in response &&
        response.error
      ) {
        showToast(
          "error",
          "Password reset failed",
          response.message ||
            "We couldn’t reset your password. Please try again."
        );
        setLoading(false);
        return;
      }

      showToast(
        "success",
        "Account setup successful",
        "Your password has been set. You can now log in to your account."
      );
      router.push("/complete");
    } catch (error: unknown) {
      console.error(error);
      showToast("error", "Something went wrong", "Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = password.length > 0 && confirmPassword.length > 0;

  return (
    <main className="flex min-h-screen">
      <section className="hidden md:flex flex-1">
        <AuthBackground />
      </section>

      <section className="flex flex-1 flex-col justify-center items-center p-6 bg-white">
        <div className="w-full max-w-[563px] space-y-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-[16px]">
            <h3 className="text-[32px] font-medium text-[#2A2829]">
              Setup Account
            </h3>
            <p className="text-[#928F8B] font-normal text-[16px]">
              Create a secure password to protect your account.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleAdminPasswordSetup}>
            {/* Password */}
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
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2 mt-2.5">
              <Label
                className="text-[18px] font-medium text-[#2A2829]"
                htmlFor="confirm-password"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Rewrite your password"
                  className="h-12 text-[16px] rounded-[12px] border-[#B1B1AE] px-4 pr-10 outline-none"
                />
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
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !isFormValid}
              className={`h-12 w-full rounded-[12px] text-[18px] font-medium mt-11 
                ${
                  loading
                    ? "bg-[#A2185A]/70 cursor-not-allowed"
                    : "bg-[#A2185A] text-white hover:bg-[#A2185A]/80 cursor-pointer"
                }
              `}
            >
              {loading ? (
                <BeatLoader size={8} color="#fff" />
              ) : (
                "Complete setup"
              )}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SetUpAdminPasswordPage;
