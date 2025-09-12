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

const VerifyPage = () => {
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 10 minutes (in seconds)

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

  const [error, setError] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp !== "1234") {
      // fake validation
      setError(true);
    } else {
      setError(false);
      console.log("OTP Verified!");
    }
  };
  const handleResend = () => {
    // put your resend OTP API call here
    console.log("Resend OTP");
    setTimeLeft(10 * 60); // reset timer back to 10 minutes
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
                  maxLength={4}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={otp}
                  onChange={(val) => setOtp(val)}
                  aria-invalid={error ? "true" : "false"}
                >
                  <InputOTPGroup className="gap-3">
                    {[0, 1, 2, 3].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        aria-invalid={error ? "true" : "false"}
                        className={cn(
                          "h-16 w-14 text-[20px] text-center rounded-lg border border-[#BDC0CE] transition",
                          "data-[active=true]:border-[#A2185A] data-[active=true]:ring-1 data-[active=true]:ring-[#A2185A]",
                          "aria-invalid:border-[#FF9594] aria-invalid:ring-1 aria-invalid:ring-[#FF9594]"
                        )}
                      />
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
              className="h-12 w-full bg-[#A2185A] cursor-pointer rounded-[12px] text-[18px] font-medium text-white mt-11"
            >
              Verify Invitation
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default VerifyPage;
