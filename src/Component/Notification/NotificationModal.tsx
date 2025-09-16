"use client";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import NotificationItem from "./NotificationItem";
import { groupNotifications } from "./groupNotifications";

type Notification = {
  id: string;
  message: string;
  createdAt: Date; // ISO date string
};

const notifications = [
  // Today
  {
    id: "1",
    message: "Demi Wikinson accepted admin invite",
    createdAt: new Date("2025-09-16T09:23:00.000Z"),
  },
  {
    id: "2",
    message: "James followed you",
    createdAt: new Date("2025-09-16T14:45:00.000Z"),
  },

  // Yesterday
  {
    id: "3",
    message: "Server maintenance completed",
    createdAt: new Date("2025-09-15T15:00:00.000Z"),
  },
  {
    id: "4",
    message: "New comment on your post",
    createdAt: new Date("2025-09-15T19:10:00.000Z"),
  },

  // Last Week
  {
    id: "5",
    message: "Your subscription has been renewed",
    createdAt: new Date("2025-09-12T10:30:00.000Z"),
  },
  {
    id: "6",
    message: "Maria liked your photo",
    createdAt: new Date("2025-09-10T22:05:00.000Z"),
  },

  // Last Month
  {
    id: "7",
    message: "Weekly report is ready",
    createdAt: new Date("2025-08-25T08:15:00.000Z"),
  },
  {
    id: "8",
    message: "Password changed successfully",
    createdAt: new Date("2025-08-20T17:40:00.000Z"),
  },

  // Older
  {
    id: "9",
    message: "Welcome to the platform 🎉",
    createdAt: new Date("2025-06-01T12:00:00.000Z"),
  },
  {
    id: "10",
    message: "System update applied",
    createdAt: new Date("2024-12-15T09:45:00.000Z"),
  },
];

const NotificationModal = ({ onClose }: { onClose: () => void }) => {
  const grouped = groupNotifications(notifications);

  return (
    <motion.section
      style={{ width: "520px" }}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute right-10 top-[80px] flex flex-col items-start bg-white shadow-md py-4 rounded-lg w-[350px] z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-start w-[520px] px-[32px] py-[16px]">
        <div>
          <h3 className="font-semibold text-lg">Notifications</h3>
          <p className="text-sm text-[#65605C] text-[1rem]">
            Stay up to date with your latest notifications
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="bg-[#FFFFFF] h-[45px] w-[45px] flex items-center justify-center shadow cursor-pointer"
          aria-label="Close notifications"
        >
          <X className="text-[#A2185A] hover:text-gray-700" />
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#F9F9F7] px-[32px] py-[12px] w-full mt-3 flex justify-between items-center">
        <div className="flex items-center gap-[12px]">
          <button type="button">All</button>
          <button type="button">
            Unread (<span>12</span>)
          </button>
        </div>
        <button
          type="button"
          className="text-[#A2185B] flex items-center gap-2"
        >
          <Check />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Notifications */}
      <div className="h-[500px] w-[520px] px-[32px] overflow-y-auto">
        {Object.entries(grouped).map(([group, items]) => (
          <div className="pt-3" key={group}>
            <h4 className="text-[#65605C] text-[1rem] leading-[24px] font-normal py-[15px]">
              {group}
            </h4>
            <div className="space-y-4">
              {items.map((notif) => (
                <NotificationItem key={notif.id} {...notif} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default NotificationModal;
