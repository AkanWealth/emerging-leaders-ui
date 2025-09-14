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

type UserStatus = "Active" | "Deactivated";

type UserListType = {
  full_name: string;
  email: string;
  last_active: Date;
  createdAt: Date;
  status: UserStatus;
};

const UserData: UserListType[] = [
  {
    full_name: "David Jack",
    email: "iamjack@gmail.com",
    last_active: new Date("2025-06-01"),
    createdAt: new Date("2025-01-10"),
    status: "Active",
  },
  {
    full_name: "Sarah Green",
    email: "sarah.green@gmail.com",
    last_active: new Date("2025-05-20"),
    createdAt: new Date("2025-02-14"),
    status: "Deactivated",
  },
];

const UserList = () => {
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
            <col className="w-[25%]" /> {/* Full Name */}
            <col className="w-[25%]" /> {/* Email */}
            <col className="w-[15%]" /> {/* Last Active */}
            <col className="w-[15%]" /> {/* Date Joined */}
            <col className="w-[10%]" /> {/* Status */}
            <col className="w-[10%]" /> {/* Action */}
          </colgroup>

          <TableHeader>
            <TableRow className="bg-[#F9F9F7] h-[60px]">
              <TableHead className="whitespace-nowrap text-[#2A2829] text-[16px] font-medium">
                Full Name
              </TableHead>
              <TableHead className="whitespace-nowrap text-[#2A2829] text-[16px] font-medium">
                Email
              </TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#2A2829] text-[16px] font-medium">
                Last Active
              </TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#2A2829] text-[16px] font-medium">
                Date Joined
              </TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#2A2829] text-[16px] font-medium">
                Status
              </TableHead>
              <TableHead className="whitespace-nowrap text-center text-[#2A2829] text-[16px] font-medium">
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
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-24 mx-auto" />
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
            ) : UserData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      src="/dashboard/EmptyLeaderBoard.svg"
                      alt="Empty Table"
                      width={290}
                      height={290}
                    />
                    <aside className="flex flex-col gap-2">
                      <h3 className="font-medium text-[#2A2829] text-[20px]">
                        No users available
                      </h3>
                      <p className="text-[#2A2829] font-normal text-[16px]">
                        Users will appear here once added.
                      </p>
                    </aside>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              UserData.map((user, i) => (
                <TableRow className="h-[60px]" key={i}>
                  <TableCell className="text-[16px] text-[#2A2829]">
                    {user.full_name}
                  </TableCell>
                  <TableCell className="text-[16px] text-[#2A2829]">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-center text-[16px] text-[#2A2829]">
                    {formatDate(user.last_active)}
                  </TableCell>
                  <TableCell className="text-center text-[16px] text-[#2A2829]">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="text-center text-[16px] text-[#2A2829]">
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell className="text-center text-[16px] text-[#2A2829]">
                    <EllipsisVertical className="mx-auto cursor-pointer" />
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

export default UserList;
