"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SupportStatus } from "./SupportTable";

interface StatusBadgeProps {
  status: SupportStatus;
}

const statusStyles: Record<SupportStatus, string> = {
  "In Progress": "bg-[#E5F5FF] text-[#407BFF]",
  Pending: "bg-[#F3F3F1] text-[#65605C] ",
  Resolved: "bg-[#E5FBEC] text-[#3DA755] ",
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
