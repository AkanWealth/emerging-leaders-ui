"use client";

import React from "react";
import { cn } from "@/lib/utils";

type AdminStatus = "Active" | "Inactive" | "Pending" | "Deactivated";

interface StatusBadgeProps {
  status: AdminStatus;
}

const statusStyles: Record<AdminStatus, string> = {
  Active: "bg-[#E5FBEC] text-[#3DA755] ",
  Inactive: "bg-[#FFF7E5] text-[#B36F09] ",
  Pending: "bg-[#F3F3F1] text-[#65605C] ",
  Deactivated: "bg-[#FFEDED] text-[#E81313]",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={cn(
        "px-[24px] py-[4px] rounded-[8px] text-[12px] leading-[16px] font-normal whitespace-nowrap",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
