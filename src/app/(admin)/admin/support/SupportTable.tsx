"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect, useRef, useCallback } from "react";
import { formatDate } from "@/utils/formatDate";
import StatusBadge from "./StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ban, EllipsisVertical, RotateCcw } from "lucide-react";
import { supportModalStore } from "@/store/supportStore";

export type SupportStatus = "Pending" | "In Progress" | "Resolved";

export type supportType = {
  ticket_id: string;
  subject: string;
  name: string;
  status: SupportStatus;
  createdAt: Date;
};

const SupportData: supportType[] = [
  {
    ticket_id: "#82937",
    subject: "Leadership resources not loading",
    name: "Jane Adebayo",
    status: "In Progress",
    createdAt: new Date(),
  },
  {
    ticket_id: "#82938",
    subject: "Unable to reset password",
    name: "Michael John",
    status: "Pending",
    createdAt: new Date(),
  },
  {
    ticket_id: "#82939",
    subject:
      "Billing issue with subscription and invoice mismatch — very long subject to test truncation",
    name: "Chioma Okafor",
    status: "Resolved",
    createdAt: new Date(),
  },
];

// Custom hook to detect text overflow
const useTextOverflow = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const checkOverflow = useCallback(() => {
    if (ref.current) {
      const isOverflow = ref.current.scrollWidth > ref.current.clientWidth;
      setIsOverflowing(isOverflow);
    }
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [checkOverflow]);

  return { ref, isOverflowing, checkOverflow };
};

// Conditional tooltip wrapper component
const ConditionalTooltip = ({
  content,
  className = "",
}: {
  //   children: React.ReactNode;
  content: string;
  className?: string;
}) => {
  const { ref, isOverflowing } = useTextOverflow();

  if (!isOverflowing) {
    return (
      <span ref={ref} className={`block truncate ${className}`}>
        {content}
      </span>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span ref={ref} className={`block truncate ${className}`}>
            {content}
          </span>
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SupportTable = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className="w-full overflow-x-auto">
        <Table className="table-fixed min-w-[800px]">
          <colgroup>
            <col className="w-[15%]" /> {/* Ticket ID */}
            <col className="w-[30%]" /> {/* Subject */}
            <col className="w-[20%]" /> {/* Name */}
            <col className="w-[15%]" /> {/* Status */}
            <col className="w-[15%]" /> {/* Created At */}
            <col className="w-[5%]" /> {/* Action */}
          </colgroup>

          {!loading && SupportData.length > 0 && (
            <TableHeader>
              <TableRow className="bg-[#F9F9F7] h-[60px]">
                <TableHead className="text-[#2A2829] text-[16px] font-medium">
                  Ticket ID
                </TableHead>
                <TableHead className="text-[#2A2829] text-[16px] font-medium">
                  Subject
                </TableHead>
                <TableHead className="text-[#2A2829] text-[16px] font-medium">
                  Name
                </TableHead>
                <TableHead className="text-center text-[#2A2829] text-[16px] font-medium">
                  Status
                </TableHead>
                <TableHead className="text-center text-[#2A2829] text-[16px] font-medium">
                  Created At
                </TableHead>
                <TableHead className="text-center text-[#2A2829] text-[16px] font-medium">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
          )}

          <TableBody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} className="h-[60px]">
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-6 mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : SupportData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No tickets found
                </TableCell>
              </TableRow>
            ) : (
              SupportData.map((ticket, i) => (
                <TableRow className="h-[60px]" key={i}>
                  {/* Ticket ID with conditional tooltip */}
                  <TableCell className="text-[16px] text-[#2A2829] truncate max-w-[120px]">
                    <ConditionalTooltip content={ticket.ticket_id} />
                  </TableCell>

                  {/* Subject with conditional tooltip */}
                  <TableCell className="text-[16px] text-[#2A2829] truncate max-w-[200px]">
                    <ConditionalTooltip content={ticket.subject} />
                  </TableCell>

                  {/* Name with conditional tooltip */}
                  <TableCell className="text-[16px] text-[#2A2829] truncate max-w-[160px]">
                    <ConditionalTooltip content={ticket.name} />
                  </TableCell>

                  <TableCell className="text-center text-[16px] text-[#2A2829]">
                    <StatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell className="text-center text-[16px] text-[#2A2829]">
                    {formatDate(ticket.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <EllipsisVertical className="mx-auto cursor-pointer" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        sideOffset={2}
                        className="w-56 p-0 text-[#65605C] text-[16px] leading-[24px] font-normal rounded-[20px] shadow-md border border-[#E5E7EF]"
                      >
                        {/* Example Actions */}
                        <DropdownMenuItem
                          className="gap-2 py-[18px] px-[25px] cursor-pointer text-[#3DA755] focus:bg-[#c5f8d1] focus:text-[#3DA755]"
                          onClick={() =>
                            supportModalStore
                              .getState()
                              .openModal("viewTicket", ticket)
                          }
                        >
                          <RotateCcw className="h-[18px] w-[18px] text-[#3DA755]" />
                          View Ticket
                        </DropdownMenuItem>

                        <div className="w-full h-[1px] bg-[#E5E7EF]" />

                        <DropdownMenuItem
                          className="gap-2 py-[18px] px-[25px] cursor-pointer text-[#E81313] focus:bg-[#FEE2E2] focus:text-[#E81313]"
                          onClick={() =>
                            supportModalStore
                              .getState()
                              .openModal("closeTicket", ticket)
                          }
                        >
                          <Ban className="h-[18px] w-[18px] text-[#E81313]" />
                          Close Ticket
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default SupportTable;
