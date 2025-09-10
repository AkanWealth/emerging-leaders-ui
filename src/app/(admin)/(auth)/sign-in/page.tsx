"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import AuthBackground from "../../shared/Backgrounds/AuthBackground";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <main className="flex min-h-screen">
      <section className="hidden md:flex flex-1">
        <AuthBackground />
      </section>

      <section className="flex flex-1 flex-col justify-center items-center p-6 bg-white">
        <div className="w-full max-w-[563px] space-y-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-[16px]">
            <h3 className="text-[32px] font-medium text-[#2A2829]">
              Welcome Back
            </h3>
            <p className="text-[#928F8B] font-normal text-[16px]">
              Enter your details to login as an admin
            </p>
          </div>

          <form className="space-y-4">
            <div className="grid gap-2">
              <Label
                className="text-[18px] font-medium text-[#2A2829]"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your official email address"
                className="h-12 text-[16px] rounded-[12px] border-[#B1B1AE] px-4 outline-none"
              />
            </div>

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
              <div className="w-full flex justify-end">
                <Button
                  asChild
                  variant="link"
                  className="text-[14px] text-[#A2185A] font-medium self-end mt-1 p-0 cursor-pointer hover:no-underline"
                >
                  <Link href="/forgot-password">Forgot Password?</Link>
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-[#A2185A] cursor-pointer rounded-[12px] text-[18px] font-medium text-white mt-11"
            >
              Log In
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
