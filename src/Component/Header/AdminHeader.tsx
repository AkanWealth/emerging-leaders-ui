"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { COOKIE_NAMES, removeCookie } from "@/utils/cookiesUtils";
import { useToastStore } from "@/store/toastStore";
import { useUserStore } from "@/store/userStore";

// TruncatedText with instant tooltip
const TruncatedText = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [text]);

  return (
    <p
      ref={textRef}
      className={`truncate ${className}`}
      title={isTruncated ? text : ""} // instant tooltip (default browser tooltip has no delay)
    >
      {text}
    </p>
  );
};

const AdminHeader = () => {
  const { showToast } = useToastStore();
  const { user } = useUserStore();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAdminLogOut = () => {
    removeCookie(COOKIE_NAMES.ADMIN_AUTH_TOKENS);
    router.push("/sign-in");
    showToast("success", "Logout Successful", "You are now logged out");
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="w-full h-[80px] bg-white flex justify-end items-center px-6 shadow-md relative">
      <section className="flex items-center gap-[20px] justify-end">
        {/* Notification bell */}
        <aside className="bg-[#F9F9F7] px-[10px] py-[10px] rounded-full cursor-pointer relative">
          <Bell className="h-[32px] w-[32px] text-[#65605C]" />
          <span className="absolute top-1 right-3 bg-[#F29100] text-white text-xs font-bold rounded-full h-[8px] w-[8px] flex items-center justify-center"></span>
        </aside>

        {/* Divider */}
        <aside className="h-[60px] w-[2px] bg-[#E7E7E5]"></aside>

        {/* Profile toggle */}
        <aside
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Image
            src="/dashboard/user.jpg"
            alt="Description"
            className="rounded-full h-[50px] w-[50px] object-cover"
            width={50}
            height={50}
          />
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown />
          </motion.div>
        </aside>
      </section>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.section
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute right-10 top-[80px] flex flex-col items-center bg-[#FFFFFF] shadow-md py-2 rounded-lg w-[250px] z-50"
          >
            {/* Profile info */}
            <aside className="flex items-center gap-4 px-4 py-3 w-full">
              <Image
                src="/dashboard/user.jpg"
                alt="Description"
                className="h-[32px] w-[32px] object-cover rounded-full"
                width={120}
                height={120}
              />
              <aside className="flex flex-col w-[150px]">
                <TruncatedText
                  text={user?.name}
                  className="text-[16px] font-medium text-[#2A2829]"
                />
                <TruncatedText
                  text={user?.email}
                  className="text-[#65605C] font-normal text-[14px]"
                />
              </aside>
            </aside>
            <div className="w-full h-[1px] bg-[#E5E7EF]" />

            {/* Actions */}
            <aside className="w-full">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-3 w-full cursor-pointer hover:bg-gray-100 transition"
              >
                <User />
                <span>View profile</span>
              </button>
              <div className="w-full h-[1px] bg-[#E5E7EF]" />
              <button
                onClick={handleAdminLogOut}
                type="button"
                className="flex items-center gap-2 text-[#E81313] w-full px-4 py-3 cursor-pointer hover:bg-red-50 transition"
              >
                <LogOut />
                <span>Log out</span>
              </button>
            </aside>
          </motion.section>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AdminHeader;
