import { formatDate, formatToTime } from "@/utils/formatDate";
import Image from "next/image";
type Props = {
  message: string;
  createdAt: Date;
};

const NotificationItem = ({ message, createdAt }: Props) => {
  return (
    <section className="flex  w-full gap-[20px]">
      <Image
        src="/dashboard/user.jpg"
        alt="Users name"
        width={48}
        height={48}
        className="rounded-full h-[48px] w-[48px]"
      />
      <aside className="flex-1 ">
        <aside className="flex items-center justify-between 0">
          <h4 className="text-[#2A2829] text-[.875rem] leading-[20px] font-normal">
            {message}
          </h4>
          <span className="bg-[#17B26A] h-[8px] w-[8px] rounded-full"></span>
        </aside>
        <p className="text-[#928F8B] text-[.75rem] leading-[16px] font-normal">
          {formatDate(createdAt)} | {formatToTime(createdAt)}
        </p>
      </aside>
    </section>
  );
};

export default NotificationItem;
