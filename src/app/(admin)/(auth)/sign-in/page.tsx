"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import AuthBackground from "../../../../shared/Backgrounds/AuthBackground";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import authService from "@/services/authServices";
import { useToastStore } from "@/store/toastStore";
import { COOKIE_NAMES, setCookie } from "@/utils/cookiesUtils";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
type SigninResponse =
  | { error: string }
  | {
      tokens: string;
      user: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        profilePicture: string | null;
      };
    };

const LoginPage = () => {
  const router = useRouter();
  const { showToast } = useToastStore();
  const { setUser } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      // Define the expected response type

      const response = (await authService.signin({
        email,
        password,
      })) as SigninResponse;
      // Type guard for response
      if (
        typeof response === "object" &&
        response !== null &&
        "error" in response
      ) {
        showToast(
          "error",
          "Invalid email or password",
          "Please try again.",
          3000
        );
      } else if (
        typeof response === "object" &&
        response !== null &&
        "tokens" in response &&
        "user" in response
      ) {
        console.log(response);
        setCookie(COOKIE_NAMES.ADMIN_AUTH_TOKENS, response.tokens);

        setUser({
          id: response.user.id,
          email: response.user.email,
          firstname: response.user.firstname,
          lastname: response.user.lastname,
          profilePicture: response.user.profilePicture,
          isAdmin: false
        });
        router.push("/admin/dashboard");
        showToast("success", "Login successfully", "You are logged in.", 3000);
      }
    } catch (error) {
      console.log(error);
      showToast(
        "error",
        "Login Failed",
        "Failed to sign in. Please try again.",
        3000
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const isDisabled = isLoading || !email || !password;

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

          <form onSubmit={handleAdminLogin} className="space-y-4">
            {/* Email */}
            <div className="grid gap-2">
              <Label
                className="text-[18px] font-medium text-[#2A2829]"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Enter your official email address"
                className="h-12 text-[16px] rounded-[12px] border-[#B1B1AE] px-4 outline-none"
              />
            </div>

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

            {/* Submit */}
            <Button
              type="submit"
              onClick={handleAdminLogin}
              disabled={isLoading || !email || !password}
              className="h-12 w-full rounded-[12px] text-[18px] font-medium mt-11 bg-[#A2185A] hover:bg-[#A2185A]/80 text-white shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
