"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SupportStatus } from "./SupportTable";

const StatusList = {
  IN_PROGRESS: "In Progress",
  PENDING: "Pending",
  RESOLVED: "Resolved",
};

interface StatusBadgeProps {
  status: SupportStatus;
}

const statusStyles: Record<SupportStatus, string> = {
  IN_PROGRESS: "bg-[#E5F5FF] text-[#407BFF]",
  PENDING: "bg-[#F3F3F1] text-[#65605C] ",
  RESOLVED: "bg-[#E5FBEC] text-[#3DA755] ",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={cn(
        "px-[24px] py-[4px] rounded-[8px] text-[12px] leading-[16px] font-normal whitespace-nowrap",
        statusStyles[status]
      )}
    >
      {StatusList[status]}
    </span>
  );
};

export default StatusBadge;
