"use client";
import React, { useState } from "react";
import AuthBackground from "../../../../shared/Backgrounds/AuthBackground";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrengthMeter from "../../../../shared/Meter/PasswordStrengthMeter";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

          <form className="space-y-4">
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

            <Button
              type="submit"
              className="h-12 w-full bg-[#A2185A] cursor-pointer rounded-[12px] text-[18px] font-medium text-white mt-11"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
