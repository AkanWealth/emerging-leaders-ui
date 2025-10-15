"use client";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import NotificationItem from "./NotificationItem";
import { groupNotifications } from "./groupNotifications";
import { forwardRef, useEffect, useState } from "react";
import notificationService from "@/services/notificationService";
import NotificationSkeleton from "./NotificationSkeleton";
import EmptyNotification from "./EmptyNotification";

type NotificationData = {
  user: { firstname: string; lastname: string; profilePicture: string | null; };
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  sender: {
    firstname: string;
    lastname: string;
    profilePicture: string | null;
  };
};

type ApiNotification = {
  data: NotificationData[];
  error?: string;
};
type NoResponseApiResponse = {
  error?: string;
};

type NotificationModalProps = {
  onClose: () => void;
};

const NotificationModal = forwardRef<HTMLDivElement, NotificationModalProps>(
  ({ onClose }, ref) => {
    const [notificationsList, setNotificationsList] = useState<
      ApiNotification["data"]
    >([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);
    const handleMarkAsRead = async (notificationId: string) => {
      try {
        const response = (await notificationService.markNotificationAsRead(
          notificationId
        )) as NoResponseApiResponse;
        if (response.error) {
          throw Error("Error marking notification as read");
          return;
        }

        // Update local state immediately
        setNotificationsList((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, read: true } : notif
          )
        );
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    };
    // ✅ Add this function inside your component before the return()
    const handleMarkAllAsRead = async () => {
      try {
        const response =
          (await notificationService.markAllNotificationAsRead()) as NoResponseApiResponse;

        if (response.error) {
          throw new Error("Failed to mark all as read");
        }

        // ✅ Update local state
        setNotificationsList((prev) =>
          prev.map((notif) => ({ ...notif, read: true }))
        );
      } catch (error) {
        console.error("Error marking all as read:", error);
      }
    };

    useEffect(() => {
      const fetchNotificationsList = async () => {
        try {
          const response =
            (await notificationService.getUserNotifications()) as ApiNotification;

          if (response.error) {
            setErrorMsg("Failed to load notifications");
            return;
          }

          const sorted = [...response.data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          setNotificationsList(sorted);
        } catch (error) {
          console.error(error);
          setErrorMsg("Something went wrong fetching notifications");
        } finally {
          setLoading(false);
        }
      };

      fetchNotificationsList();
    }, []);

    // ✅ Filter logic
    const filteredNotifications = showUnreadOnly
      ? notificationsList.filter((n) => !n.read)
      : notificationsList;

    // ✅ Group after filtering
    const grouped = groupNotifications(
      filteredNotifications.map((notif) => ({
        id: notif.id,
        message: notif.body,
        createdAt: new Date(notif.createdAt),
        read: notif.read,
        user: notif.sender,
      }))
    );

    const unreadCount = notificationsList.filter((n) => !n.read).length;

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute right-10 top-[80px] flex flex-col items-start bg-white shadow-md py-4 rounded-lg w-[520px] z-50"
      >
        {/* Header */}
        <div className="flex justify-between items-start w-full px-[32px] py-[16px]">
          <div>
            <h3 className="font-semibold text-lg">Notifications</h3>
            <p className="text-sm text-[#65605C]">
              Stay up to date with your latest notifications
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#FFFFFF] h-[45px] w-[45px] flex items-center justify-center shadow cursor-pointer rounded"
            aria-label="Close notifications"
          >
            <X className="text-[#A2185A] hover:text-gray-700" />
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#F9F9F7] px-[32px] py-[12px] w-full mt-3 flex justify-between items-center">
          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              onClick={() => setShowUnreadOnly(false)}
              className={`font-medium ${
                !showUnreadOnly ? "text-[#A2185B]" : "text-[#65605C]"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setShowUnreadOnly(true)}
              className={`${
                showUnreadOnly ? "text-[#A2185B] font-medium" : "text-[#65605C]"
              }`}
            >
              Unread (<span>{unreadCount}</span>)
            </button>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            type="button"
            className="text-[#A2185B] flex items-center gap-2 hover:text-[#8a1550]"
          >
            <Check size={18} />
            <span>Mark all as read</span>
          </button>
        </div>

        {/* Notifications */}
        <div className="h-[500px] w-full px-[32px] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col gap-4 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <NotificationSkeleton key={i} />
              ))}
            </div>
          ) : errorMsg ? (
            <p className="text-center text-red-500 mt-6">{errorMsg}</p>
          ) : filteredNotifications.length === 0 ? (
            <EmptyNotification />
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <div className="pt-3" key={group}>
                <h4 className="text-[#65605C] text-base font-normal py-[15px]">
                  {group}
                </h4>
                <div className="space-y-4">
                  {items.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      id={notif.id}
                      message={notif.message}
                      createdAt={notif.createdAt}
                      read={(notif as unknown as NotificationData).read}
                      sender={(notif as unknown as NotificationData).user}
                      onRead={handleMarkAsRead} // 👈 pass the handler
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.section>
    );
  }
);

NotificationModal.displayName = "NotificationModal";
export default NotificationModal;
