// components/Notification/NotificationSkeleton.tsx
"use client";

const NotificationSkeleton = () => {
  return (
    <div className="animate-pulse flex items-center w-full gap-[20px]">
      {/* Profile Picture */}
      <div className="bg-gray-200 rounded-full h-[48px] w-[48px]" />

      {/* Text Section */}
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
