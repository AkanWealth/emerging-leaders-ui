"use client";
import { formatDate, formatToTime } from "@/utils/formatDate";
import Image from "next/image";

type Props = {
  id: string;
  message: string;
  createdAt: Date;
  read: boolean;
  sender: {
    firstname: string;
    lastname: string;
    profilePicture: string | null;
  };
  onRead?: (id: string) => void;
};

const NotificationItem = ({
  id,
  message,
  createdAt,
  read,
  sender,
  onRead,
}: Props) => {
  console.log(sender, "This is the sender");

  const handleClick = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    e.stopPropagation(); // prevent modal or parent clicks
    if (!read && onRead) {
      onRead(id);
    }
  };

  return (
    <section
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick(e)}
      className={`flex w-full gap-[20px] items-start p-2 rounded-lg transition cursor-pointer ${
        !read ? "bg-[#F9F9F7]" : ""
      } hover:bg-[#f0efed]`}
    >
      <Image
        src={
          sender?.profilePicture && sender.profilePicture.trim() !== ""
            ? sender.profilePicture
            : `https://ui-avatars.com/api/?name=${sender?.firstname}&background=000000&color=fff`
        }
        alt={
          sender?.firstname
            ? sender.firstname + " " + sender.lastname
            : "User's name"
        }
        unoptimized
        width={48}
        height={48}
        className="rounded-full h-[48px] w-[48px]"
      />

      <aside className="flex-1">
        <aside className="flex items-center justify-between">
          <h4 className="text-[#2A2829] text-[.875rem] leading-[20px] font-normal">
            {message}
          </h4>
          {!read && (
            <span className="bg-[#17B26A] h-[8px] w-[8px] rounded-full"></span>
          )}
        </aside>
        <p className="text-[#928F8B] text-[.75rem] leading-[16px] font-normal">
          {formatDate(createdAt)} | {formatToTime(createdAt)}
        </p>
      </aside>
    </section>
  );
};

export default NotificationItem;
