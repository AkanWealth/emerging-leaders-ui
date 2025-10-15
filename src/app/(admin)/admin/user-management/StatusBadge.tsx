"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AdminStatus } from "@/hooks/admin/user-management/Admins/useAdminList";
import { format } from "path";
import formatText from "@/utils/formatText";

interface StatusBadgeProps {
  status: AdminStatus;
}

const statusStyles: Record<AdminStatus, string> = {
  ACTIVE: "bg-[#E5FBEC] text-[#3DA755] ",
  INACTIVE: "bg-[#FFF7E5] text-[#B36F09] ",
  PENDING: "bg-[#F3F3F1] text-[#65605C] ",
  DEACTIVATED: "bg-[#FFEDED] text-[#E81313]",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={cn(
        "px-[24px] py-[4px] rounded-[8px] text-[12px] leading-[16px] font-normal whitespace-nowrap",
        statusStyles[status]
      )}
    >
      {formatText(status)}
    </span>
  );
};

export default StatusBadge;
