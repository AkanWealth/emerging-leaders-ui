"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const authenticated = checkAuth();
    setIsChecking(false);

    // Save last visited admin page for redirect
    if (authenticated && pathname.startsWith("/admin")) {
      localStorage.setItem("lastAdminPath", pathname);
    }

    // If not authenticated but trying to access admin pages
    if (!authenticated && pathname.startsWith("/admin")) {
      router.push("/sign-in");
      return;
    }

    // If authenticated and trying to access non-admin routes (except "/")
    if (authenticated && !pathname.startsWith("/admin") && pathname !== "/") {
      const lastAdminPath =
        localStorage.getItem("lastAdminPath") || "/admin/dashboard";
      router.push(lastAdminPath);
    }
  }, [pathname, checkAuth, router]);

  // Show nothing while checking authentication
  if (isChecking) {
    return null; // or a loading spinner
  }

  // If not authenticated and on admin page, show nothing while redirecting
  if (!isAuthenticated && pathname.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
}
