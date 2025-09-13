"use client";
import React, { useEffect, useState } from "react";
import AuthBackground from "../../shared/Backgrounds/AuthBackground";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { cn } from "@/lib/utils";
import { COOKIE_NAMES, getCookie, removeCookie } from "@/utils/cookiesUtils";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";
import authService from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/toastStore";

const VerifyPage = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastStore();

  // countdown logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // grab OTP from cookie and animate filling one by one
  // useEffect(() => {
  //   const code = getCookie(COOKIE_NAMES.INVITE_CODE);
  //   if (code) {
  //     let i = 0;
  //     const interval = setInterval(() => {
  //       setOtp((prev) => prev + String(code)[i]);
  //       i++;
  //       if (i >= String(code).length) clearInterval(interval);
  //     }, 200);
  //   }
  // }, []);
  useEffect(() => {
    const code = getCookie(COOKIE_NAMES.INVITE_CODE);
    if (code) {
      let i = 0;
      let newOtp = "";
      const interval = setInterval(() => {
        newOtp += String(code)[i];
        setOtp(newOtp); // replace instead of appending to stale prev
        i++;
        if (i >= String(code).length) clearInterval(interval);
      }, 200);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError(true);
      // showToast("error", "");
      return;
    }

    setError(false);
    setLoading(true);

    try {
      const email = getCookie(COOKIE_NAMES.INVITE_EMAIL);
      const response = await authService.verifyOtp({ email, otp });
      // Type assertion to expected response shape
      const res = response as { error?: boolean };
      if (res.error) {
        showToast(
          "error",
          "Invalid or Expired OTP.",
          "The OTP you entered is either incorrect or has expired."
        );
        setError(true);
        return;
      }
      showToast(
        "success",
        "Email verified successfully",
        "Your account has been successfully created"
      );
      removeCookie(COOKIE_NAMES.INVITE_CODE);
      router.push("/success");
    } catch (err: unknown) {
      console.log(err);
      showToast(
        "error",
        "Failed to verify otp",
        "There was an error while verifying otp"
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    console.log("Resend OTP");
    setTimeLeft(10 * 60);
    setOtp("");
  };

  return (
    <main className="flex min-h-screen">
      <section className="hidden md:flex flex-1">
        <AuthBackground />
      </section>

      <section className="flex flex-1 flex-col justify-center items-center p-6 bg-white">
        <div className="w-full max-w-[563px] space-y-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-[28px] font-medium text-[#2A2829]">
              Admin Invitation
            </h3>
            <p className="text-[#928F8B] font-normal text-[18px]">
              You’ve been invited to join as an admin.
            </p>
          </div>

          <form className="space-y-4">
            <div className="grid gap-3">
              <p className="text-[#928F8B] font-normal text-[18px]">
                To continue, please verify your invitation using the passcode
                sent to your email.
              </p>

              <div>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={otp}
                  onChange={(val) => setOtp(val)}
                  aria-invalid={error ? "true" : "false"}
                >
                  <InputOTPGroup className="gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        aria-invalid={error ? "true" : "false"}
                        className={cn(
                          "relative h-16 w-14 text-[20px] text-center rounded-lg border border-[#BDC0CE] transition",
                          "data-[active=true]:border-[#A2185A] data-[active=true]:ring-1 data-[active=true]:ring-[#A2185A]",
                          "aria-invalid:border-[#FF9594] aria-invalid:ring-1 aria-invalid:ring-[#FF9594]"
                        )}
                      >
                        {otp[index] && (
                          <motion.span
                            key={otp[index] + index}
                            initial={{ y: 20, opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="inline-block"
                          >
                            {otp[index]}
                          </motion.span>
                        )}
                      </InputOTPSlot>
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <p className="text-[#E81313] font-normal text-[16px]">
                  You entered an invalid code
                </p>
              )}

              <div className="flex items-center gap-2">
                <p className="">Didn’t receive a code? </p>
                {timeLeft > 0 ? (
                  <Button
                    disabled
                    className="px-4 h-[22px] rounded-[16px] bg-[#E6CCD9] cursor-not-allowed text-[#2A2829] text-[13px] font-normal"
                  >
                    Resend in {formatTime(timeLeft)}
                  </Button>
                ) : (
                  <Button
                    onClick={handleResend}
                    className="px-4 h-[22px] rounded-[16px] bg-[#A2185A] cursor-pointer hover:bg-[#A2185A]/80 text-white hover:no-underline"
                  >
                    Resend
                  </Button>
                )}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              type="submit"
              disabled={loading || otp.length != 6}
              className={cn(
                "h-12 w-full cursor-pointer rounded-[12px] text-[18px] font-medium mt-11",
                loading
                  ? "bg-[#A2185A]/70 cursor-not-allowed"
                  : "bg-[#A2185A] text-white hover:bg-[#A2185A]/80"
              )}
            >
              {loading && <BeatLoader size={8} color="#fff" />}
              {!loading && "Verify Invitation"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default VerifyPage;
