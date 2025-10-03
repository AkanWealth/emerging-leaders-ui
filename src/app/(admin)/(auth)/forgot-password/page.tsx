"use client";
import { Label } from "@/components/ui/label";
import AuthBackground from "../../../../shared/Backgrounds/AuthBackground";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import authService from "@/services/authServices";
import { useToastStore } from "@/store/toastStore";
import { BeatLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPasswordPage = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { showToast } = useToastStore();

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword({ email });
      // Narrow the type of response before accessing its properties
      if (
        typeof response === "object" &&
        response !== null &&
        "error" in response
      ) {
        if (response.error) {
          setError(true);
          // @ts-expect-error: We expect response to have message property
          showToast("error", "Failed to send reset link", response.message);
          return;
        }
      }
      showToast(
        "success",
        "Reset link sent successfully",
        "Check your email to access the link"
      );
    } catch (error: unknown) {
      console.log(error);
      showToast(
        "error",
        "Error",
        "Error occurred while trying to send reset link"
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
              Reset Admin Password
            </h3>
            <p className="text-[#928F8B] font-normal text-[16px]">
              Enter the official email address linked to your admin account.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <Label
                  className="text-[18px] font-medium text-[#2A2829]"
                  htmlFor="email"
                >
                  Email
                </Label>

                <motion.div
                  animate={error ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(false); // reset error on typing
                    }}
                    type="email"
                    id="email"
                    placeholder="Enter your official email address"
                    className={`h-12 text-[16px] rounded-[12px] border px-4 outline-none transition 
                      ${error ? "border-red-500" : "border-[#B1B1AE]"}`}
                  />
                </motion.div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    className="text-[#E81313] text-sm"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    Invalid email address
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="h-12 w-full bg-[#A2185A] hover:bg-[#8f1450] cursor-pointer rounded-[12px] text-[18px] font-medium text-white mt-11 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <BeatLoader size={8} color="#fff" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
