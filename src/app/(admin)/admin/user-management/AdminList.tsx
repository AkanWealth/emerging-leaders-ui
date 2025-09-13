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
import { useState, useEffect } from "react";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate } from "@/utils/formatDate";

type AdminStatus = "Active" | "Inactive" | "Pending" | "Deactivated";

type AdminListType = {
  full_name: string;
  role: "Admin";
  createdAt: Date;
  status: AdminStatus;
};

const adminData: AdminListType[] = [
  {
    full_name: "David Jack",
    role: "Admin",
    createdAt: new Date("2025-01-10"),
    status: "Active",
  },
  {
    full_name: "Sarah Lee",
    role: "Admin",
    createdAt: new Date("2024-12-05"),
    status: "Inactive",
  },
  {
    full_name: "Michael Brown",
    role: "Admin",
    createdAt: new Date("2025-02-20"),
    status: "Pending",
  },
  {
    full_name: "Emily Davis",
    role: "Admin",
    createdAt: new Date("2025-03-15"),
    status: "Deactivated",
  },
];

const AdminList = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <colgroup>
            <col style={{ width: "30%" }} /> {/* Full Name */}
            <col style={{ width: "15%" }} /> {/* Role */}
            <col style={{ width: "20%" }} /> {/* Date */}
            <col style={{ width: "20%" }} /> {/* Status */}
            <col style={{ width: "15%" }} /> {/* Action */}
          </colgroup>

          <TableHeader>
            <TableRow className="bg-[#F9F9F7] h-[60px]">
              <TableHead className="whitespace-nowrap text-[#2A2829] text-[16px] leading-[24px] font-medium">
                Full Name
              </TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#2A2829] text-[16px] leading-[24px] font-medium">
                Assigned Role
              </TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#2A2829] text-[16px] leading-[24px] font-medium">
                Date Added
              </TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#2A2829] text-[16px] leading-[24px] font-medium">
                Current Status
              </TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#2A2829] text-[16px] leading-[24px] font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} className="h-[60px]">
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-6 mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : adminData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
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
            ) : (
              adminData.map((admin, i) => (
                <TableRow className="h-[60px]" key={i}>
                  <TableCell className="font-normal  text-[16px] leading-[24px]  text-[#2A2829]">
                    {admin.full_name}
                  </TableCell>
                  <TableCell className="text-center font-normal  text-[16px] leading-[24px]  text-[#2A2829]">
                    {admin.role}
                  </TableCell>
                  <TableCell className="text-center font-normal  text-[16px] leading-[24px]  text-[#2A2829]">
                    {formatDate(admin.createdAt)}
                  </TableCell>
                  <TableCell className="text-center font-normal  text-[16px] leading-[24px]  text-[#2A2829]">
                    <StatusBadge status={admin.status} />
                  </TableCell>
                  <TableCell className="text-center font-normal  text-[16px] leading-[24px]  text-[#2A2829]">
                    <EllipsisVertical className="mx-auto cursor-pointer " />
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

export default AdminList;
