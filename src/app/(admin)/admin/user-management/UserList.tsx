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
import { Ban, EllipsisVertical, RotateCcw } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate } from "@/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { manageUserModalStore } from "@/store/userModalStore";
import EmptyList from "./EmptyList";
import { AdminResponse } from "@/hooks/admin/user-management/Users/useUserList";

type UserStatus = "Active" | "Deactivated";

const UserList = ({
  isLoading,
  userData = [],
}: {
  isLoading: boolean;
  userData: AdminResponse["data"];
}) => {
  console.log(userData, "This is the user data");

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

          {!isLoading && userData.length > 0 && (
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
          )}

          <TableBody>
            {isLoading ? (
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
            ) : userData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <EmptyList />
                </TableCell>
              </TableRow>
            ) : (
              userData.map((user, i) => (
                <TableRow className="h-[60px]" key={i}>
                  <TableCell className="text-[16px] text-[#2A2829]">
                    {user.firstname} {user.lastname}
                  </TableCell>
                  <TableCell className="text-[16px] text-[#2A2829]">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-center text-[16px] text-[#2A2829]">
                    {formatDate(
                      user.lastLogin ? user.lastLogin : (user.createdAt as Date)
                    )}
                  </TableCell>
                  <TableCell className="text-center text-[16px] text-[#2A2829]">
                    {formatDate(user.createdAt as Date)}
                  </TableCell>
                  <TableCell className="text-center text-[16px] text-[#2A2829]">
                    <StatusBadge status={user.status} />
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
                        {user.status === "ACTIVE" && (
                          <>
                            <DropdownMenuItem
                              className="gap-2 py-[18px] rounded-t-none px-[25px] cursor-pointer text-[#E81313] focus:bg-[#FEE2E2] focus:text-[#E81313]"
                              onClick={() =>
                                manageUserModalStore
                                  .getState()
                                  .openModal("deactivateUser", user)
                              }
                            >
                              <Ban className="h-[18px] w-[18px] text-[#E81313]" />
                              Deactivate User
                            </DropdownMenuItem>
                            <div className="w-full h-[1px] bg-[#E5E7EF]" />
                          </>
                        )}

                        {user.status === "DEACTIVATED" && (
                          <>
                            <DropdownMenuItem
                              className="gap-2 rounded-t-none py-[18px] px-[25px] cursor-pointer text-[#3DA755] focus:bg-[#c5f8d1] focus:text-[#3DA755]"
                              onClick={() =>
                                manageUserModalStore
                                  .getState()
                                  .openModal("reactivateUser", user)
                              }
                            >
                              <RotateCcw className="h-[18px] w-[18px] text-[#3DA755]" />
                              Reactivate User
                            </DropdownMenuItem>
                            <div className="w-full h-[1px] bg-[#E5E7EF]" />
                          </>
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

export default UserList;
