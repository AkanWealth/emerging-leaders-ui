import Image from "next/image";

const EmptyNotification = () => {
  return (
    <section className="flex items-center justify-center flex-col gap-5">
      <Image
        src="/no-notification.svg"
        alt="No Notification"
        width={300}
        height={300}
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-center text-[#2A2829] text-[1.25rem] leading-[30px] font-medium">
          No Notifications
        </h3>
        <p className="text-center text-[#2A2829] text-[1rem] leading-[24px] font-normal ">
          No new alerts at the moment. Check back later.
        </p>
      </div>
    </section>
  );
};

export default EmptyNotification;
