import { ReactNode } from "react";
import AdminHeader from "@/Component/Header/AdminHeader";
import AdminSidebar from "@/Component/Sidebar/AdminSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="flex w-full h-screen overflow-hidden">
      {/* Sidebar stays fixed */}
      <AdminSidebar />

      {/* Right section */}
      <div className="flex flex-col flex-1 bg-[#F9F9F7]">
        {/* Fixed header */}
        <AdminHeader />

        {/* Scrollable content */}
        <section className="flex-1 overflow-y-auto px-8 py-10">{children}</section>
      </div>
    </main>
  );
};

export default DashboardLayout;
