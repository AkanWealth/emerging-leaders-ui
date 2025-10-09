"use client";

import { useState, useRef, useEffect } from "react";
import {  ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { COOKIE_NAMES, removeCookie } from "@/utils/cookiesUtils";
import { useToastStore } from "@/store/toastStore";
import { useUserStore } from "@/store/userStore";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationModal from "../Notification/NotificationModal";
import notificationService from "@/services/notificationService";
// import notificationService from "@/services/notificationService"; // ✅ import service

// TruncatedText with instant tooltip
type UnreadResponseType = {
  unreadCount: number;
};
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
      title={isTruncated ? text : ""}
    >
      {text}
    </p>
  );
};

const AdminHeader = () => {
  const { showToast } = useToastStore();
  const { user, loading } = useUserStore();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null); // ✅ new ref

  const handleAdminLogOut = () => {
    removeCookie(COOKIE_NAMES.ADMIN_AUTH_TOKENS);
    router.push("/sign-in");
    showToast("success", "Logout Successful", "You are now logged out");
  };

  const GoToProfile = () => {
    router.push("/admin/profile");
  };

  // ✅ updated outside click handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Close dropdown if click is outside wrapper
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false);
      }

      // Close notification modal if click is outside modal
      if (modalRef.current && !modalRef.current.contains(target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Poll for unread notifications every 15 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function fetchUnread() {
      try {
        const res =
          (await notificationService.getUnreadNotificationCount()) as UnreadResponseType;
        setUnreadCount(res?.unreadCount ?? 0);
      } catch (error) {
        console.error("Failed to fetch unread notifications:", error);
      }
    }

    fetchUnread(); // run immediately
    // eslint-disable-next-line prefer-const
    interval = setInterval(fetchUnread, 15000); // run every 15s

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <header className="w-full h-[80px] bg-white flex justify-end items-center px-6 shadow-md relative">
      <section
        ref={wrapperRef}
        className="flex items-center gap-[20px] justify-end"
      >
        {/* Notification bell */}
        <aside
          className="bg-[#F9F9F7] px-[10px] py-[10px] rounded-full cursor-pointer relative"
          onClick={(e) => {
            e.stopPropagation();
            setShowNotifications((prev) => !prev);
            setIsOpen(false); // close user dropdown
          }}
        >
          <Image src="/bell.svg" alt="Bell icon" width={32} height={32} />
          {/* <Bell className="h-[32px] w-[32px] text-[#65605C]" /> */}
          {unreadCount > 0 && (
            <span className="absolute top-1 right-3 bg-[#F29100] text-white text-xs font-bold rounded-full h-[12px] w-[12px] flex items-center justify-center"></span>
          )}
        </aside>

        {/* Divider */}
        <aside className="h-[60px] w-[2px] bg-[#E7E7E5]"></aside>

        {/* Profile toggle */}
        <aside
          className="flex items-center gap-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
            setShowNotifications(false); // close notifications
          }}
        >
          {loading ? (
            <Skeleton className="h-[50px] w-[50px] rounded-full" />
          ) : (
            <Image
              src={
                user?.profilePicture && user?.profilePicture !== ""
                  ? user.profilePicture
                  : `https://ui-avatars.com/api/?name=${user?.firstname}&background=000000&color=fff`
              }
              alt="User Avatar"
              className="rounded-full h-[50px] w-[50px] object-cover"
              width={50}
              height={50}
              unoptimized
            />
          )}

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
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute right-10 top-[80px] flex flex-col items-center bg-[#FFFFFF] shadow-md py-2 rounded-lg w-[250px] z-50"
          >
            {/* Profile info */}
            <aside className="flex items-center gap-4 px-4 py-3 w-full">
              {loading ? (
                <>
                  <Skeleton className="h-[32px] w-[32px] rounded-full" />
                  <aside className="flex flex-col w-[150px] gap-1">
                    <Skeleton className="h-[16px] w-[100px] rounded" />
                    <Skeleton className="h-[14px] w-[140px] rounded" />
                  </aside>
                </>
              ) : (
                <>
                  <Image
                    src={
                      user?.profilePicture && user?.profilePicture !== ""
                        ? user.profilePicture
                        : `https://ui-avatars.com/api/?name=${user?.firstname}&background=000000&color=fff`
                    }
                    alt="Description"
                    className="h-[32px] w-[32px] object-cover rounded-full"
                    width={120}
                    height={120}
                    unoptimized
                  />
                  <aside className="flex flex-col w-[150px]">
                    <TruncatedText
                      text={`${user?.firstname ?? ""} ${user?.lastname ?? ""}`}
                      className="text-[16px] font-medium text-[#2A2829]"
                    />
                    <TruncatedText
                      text={user?.email || "Default"}
                      className="text-[#65605C] font-normal text-[14px]"
                    />
                  </aside>
                </>
              )}
            </aside>

            <div className="w-full h-[1px] bg-[#E5E7EF]" />

            {/* Actions */}
            {!loading && (
              <aside className="w-full">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-3 w-full cursor-pointer hover:bg-gray-100 transition"
                  onClick={GoToProfile}
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
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <AnimatePresence>
        {showNotifications && (
          <NotificationModal
            ref={modalRef}
            onClose={() => setShowNotifications(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default AdminHeader;
