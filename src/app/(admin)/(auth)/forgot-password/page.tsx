import { Label } from "@/components/ui/label";
import AuthBackground from "../../shared/Backgrounds/AuthBackground";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgotPasswordPage = () => {
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

          <form className="space-y-4">
            <div className="flex flex-col gap-2">
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
              <p className="text-[#E81313]">Invalid email address</p>
            </div>
            <Button
              type="submit"
              className="h-12 w-full bg-[#A2185A] cursor-pointer rounded-[12px] text-[18px] font-medium text-white mt-11"
            >
              Send Reset Link
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
