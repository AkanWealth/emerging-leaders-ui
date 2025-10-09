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
import { EllipsisVertical, Eye, Ticket, Trash2 } from "lucide-react";
import { supportModalStore } from "@/store/supportStore";
import { SupportTicket } from "@/hooks/admin/support/useSupport";
import { TicketStatus } from "./SupportFilter";
import Image from "next/image";

export type SupportStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED";

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

type SupportTableProps = {
  loading: boolean;
  data: SupportTicket[];
  search?: string;
  selected?: TicketStatus | null;
};

const SupportTable = ({
  loading,
  data,
  search,
  selected,
}: SupportTableProps) => {
  return (
    <section>
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[800px] table-auto">
          <colgroup>
            <col className="w-[15%]" /> {/* Ticket ID */}
            <col className="w-[30%]" /> {/* Subject */}
            <col className="w-[20%]" /> {/* Name */}
            <col className="w-[15%]" /> {/* Status */}
            <col className="w-[15%]" /> {/* Created At */}
            <col className="w-[5%]" /> {/* Action */}
          </colgroup>

          {!loading && data.length > 0 && (
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
                  Current Status
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
            ) : data?.length === 0 ? (
              // no data at all
              search === "" && selected === null ? (
                <EmptyTable />
              ) : (
                <NotFound />
              )
            ) : (
              data.map((ticket, i) => (
                <TableRow className="h-[60px]" key={i}>
                  {/* Ticket ID with conditional tooltip */}
                  <TableCell className="text-[16px] text-[#2A2829] truncate max-w-[120px]">
                    <ConditionalTooltip content={ticket.ticketNumber} />
                  </TableCell>

                  {/* Subject with conditional tooltip */}
                  <TableCell className="text-[16px] text-[#2A2829] truncate max-w-[200px]">
                    <ConditionalTooltip content={ticket.subject} />
                  </TableCell>

                  {/* Name with conditional tooltip */}
                  <TableCell className="text-[16px] text-[#2A2829] truncate max-w-[160px]">
                    <ConditionalTooltip content={ticket.userName} />
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
                          className="gap-2 py-[18px] px-[25px] cursor-pointer text-[#65605C] hover:bg-[#f4f4f4] focus:bg-[#f4f4f4]"
                          onClick={() =>
                            supportModalStore
                              .getState()
                              .openModal("viewTicket", ticket)
                          }
                        >
                          <Eye className="h-[18px] w-[18px] text-[#65605C]" />
                          View Ticket
                        </DropdownMenuItem>

                        <div className="w-full h-[1px] bg-[#E5E7EF]" />

                        <DropdownMenuItem
                          className="gap-2 py-[18px] px-[25px] cursor-pointer text-[#65605C] hover:bg-[#f4f4f4] focus:bg-[#f4f4f4]"
                          onClick={() =>
                            supportModalStore
                              .getState()
                              .openModal("closeTicket", ticket)
                          }
                        >
                          <Ticket className="h-[18px] w-[18px] text-[#65605C]" />
                          Close Ticket
                        </DropdownMenuItem>
                        <div className="w-full h-[1px] bg-[#E5E7EF]" />
                        <DropdownMenuItem
                          className="gap-2 py-[18px] px-[25px] cursor-pointer  hover:bg-[#fdecec] focus:bg-[#fdecec]"
                          onClick={() =>
                            supportModalStore
                              .getState()
                              .openModal("deleteTicket", ticket)
                          }
                        >
                          <Trash2 className="h-[18px] w-[18px] text-[#E81313]" />
                          <span className="text-[#E81313]">Delete Ticket</span>
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

function EmptyTable() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-10">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/dashboard/EmptyLeaderBoard.svg"
            alt="Empty Table"
            width={290}
            height={290}
          />
          <aside className="flex flex-col gap-2">
            <h3 className="font-medium text-[#2A2829] text-[20px] leading-[30px]">
              Nothing to display right now
            </h3>
            <p className="text-[#2A2829] font-normal text-[16px] leading-[24px]">
              Data will show up here as soon as it&apos;s available.
            </p>
          </aside>
        </div>
      </TableCell>
    </TableRow>
  );
}

function NotFound() {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-10">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/dashboard/NotFound.svg"
            alt="Empty Table"
            width={290}
            height={290}
          />
          <aside className="flex flex-col gap-2">
            <h3 className="font-medium text-[#2A2829] text-[20px] leading-[30px]">
              Result Not Found
            </h3>
          </aside>
        </div>
      </TableCell>
    </TableRow>
  );
}
