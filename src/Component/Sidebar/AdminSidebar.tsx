"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icons from "../../assets/icons"

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Analytics",
      href: "/admin/dashboard",
      activeIcon:Icons.Used.Analytics ,
      inactiveIcon: Icons.UnUsed.Analytics,
    },
    {
      name: "User Management",
      href: "/admin/user-management",
      activeIcon: Icons.Used.UserManagement,
      inactiveIcon: Icons.UnUsed.UserManagement,
    },
    {
      name: "Assessment Management",
      href: "/admin/assessment-management",
      activeIcon: Icons.Used.Assessment,
      inactiveIcon: Icons.UnUsed.Assessment,
    },
    {
      name: "Support",
      href: "/admin/support",
      activeIcon: Icons.Used.Support,
      inactiveIcon: Icons.UnUsed.Support,
    },
  ];

  return (
    <section className="w-[296px] h-[100vh] bg-[#FFFFFF] shadow-md flex flex-col">
      {/* Logo */}
      <nav className="flex items-center justify-center">
        <Image
          src="/logoOne.png"
          alt="Logo"
          className="w-[129px] h-[152px] object-cover rounded-full"
          width={129}
          height={152}
        />
      </nav>

      {/* Menu items */}
      <aside className="w-full mt-10 flex flex-col gap-6 px-3">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 py-[16px] px-6 rounded-[12px] cursor-pointer transition ${
                isActive
                  ? "bg-[#A2185A] text-white"
                  : "text-[#65605C] hover:bg-gray-100"
              }`}
            >
              <Image
                src={isActive ? item.activeIcon : item.inactiveIcon}
                alt={item.name}
                width={24}
                height={24}
              />
              <span className="text-[14px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </aside>
    </section>
  );
};

export default AdminSidebar;
