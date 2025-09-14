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
import { EllipsisVertical, Ban, RotateCcw, Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate } from "@/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userModalStore } from "@/store/userModalStore";

type AdminStatus = "Active" | "Inactive" | "Pending" | "Deactivated";

export type AdminListType = {
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
            <col className="w-[30%]" />
            <col className="w-[15%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[15%]" />
          </colgroup>

          <TableHeader>
            <TableRow className="bg-[#F9F9F7] h-[60px]">
              <TableHead>Full Name</TableHead>
              <TableHead className="text-center">Assigned Role</TableHead>
              <TableHead className="text-center">Date Added</TableHead>
              <TableHead className="text-center">Current Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
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
                      <p className="text-[#2A2829] text-[16px] leading-[24px]">
                        Data will show up here as soon as it&apos;s available.
                      </p>
                    </aside>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              adminData.map((admin, i) => (
                <TableRow className="h-[60px]" key={i}>
                  <TableCell>{admin.full_name}</TableCell>
                  <TableCell className="text-center">{admin.role}</TableCell>
                  <TableCell className="text-center">
                    {formatDate(admin.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={admin.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <EllipsisVertical className="mx-auto cursor-pointer" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        sideOffset={4}
                        className="w-56 p-0 text-[#65605C] text-[16px] leading-[24px] font-normal rounded-[20px] shadow-md border border-[#E5E7EF]"
                      >
                        <>
                          <DropdownMenuItem
                            onClick={() =>
                              userModalStore
                                .getState()
                                .openModal("editAdmin", admin)
                            }
                            className="gap-2 py-[18px] px-[25px] cursor-pointer rounded-b-none"
                          >
                            <Eye className="h-[18px] w-[18px]" />
                            Edit Admin Details
                          </DropdownMenuItem>
                          <div className="w-full h-[1px] bg-[#E5E7EF]" />
                        </>

                        {admin.status === "Pending" && (
                          <>
                            <DropdownMenuItem
                              className="gap-2 py-[18px] px-[25px] cursor-pointer rounded-t-none"
                              onClick={() =>
                                userModalStore
                                  .getState()
                                  .openModal("resendInvite", admin)
                              }
                            >
                              <Image
                                src="/user-management/Resend.svg"
                                alt="Resend Icon"
                                width={18}
                                height={18}
                              />
                              {/* <RotateCcw className="h-[18px] w-[18px]" /> */}
                              Resend Invite
                            </DropdownMenuItem>
                            <div className="w-full h-[1px] bg-[#E5E7EF]" />
                          </>
                        )}

                        {(admin.status === "Active" ||
                          admin.status === "Pending") && (
                          <>
                            <DropdownMenuItem
                              onClick={() =>
                                userModalStore
                                  .getState()
                                  .openModal("deactivate", admin)
                              }
                              className="gap-2 py-[18px] rounded-t-none px-[25px] cursor-pointer text-[#E81313] focus:bg-[#FEE2E2] focus:text-[#E81313]"
                            >
                              <Ban className="h-[18px] w-[18px] text-[#E81313]" />
                              Deactivate Account
                            </DropdownMenuItem>
                            <div className="w-full h-[1px] bg-[#E5E7EF]" />
                          </>
                        )}

                        {(admin.status === "Inactive" ||
                          admin.status === "Deactivated") && (
                          <DropdownMenuItem
                            onClick={() =>
                              userModalStore
                                .getState()
                                .openModal("reactivate", admin)
                            }
                            className="gap-2 rounded-t-none py-[18px] px-[25px] cursor-pointer text-[#3DA755] focus:bg-[#c5f8d1] focus:text-[#3DA755]"
                          >
                            <RotateCcw className="h-[18px] w-[18px] text-[#3DA755]" />
                            Reactivate Account
                          </DropdownMenuItem>
                        )}
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

export default AdminList;
