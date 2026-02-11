"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import { UserReportResponse } from "@/hooks/admin/assessment/useUserReport";
import formatText from "@/utils/formatText";
import EmptyAssessmentTab from "./EmptyAssessmentTab";

type UserReportTabType = {
  userReportData: UserReportResponse | undefined;
  isLoading: boolean;
};

const UserReportTab = ({ isLoading, userReportData }: UserReportTabType) => {
  return (
    <TabsContent value="user-report" className="flex-1 flex min-h-96">
      {isLoading ? (
        <div className="w-full overflow-x-auto pb-1">
          <Table className="table-fixed min-w-[1000px]">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[25%]" />
            </colgroup>

            <TableHeader>
              <TableRow className="bg-[#F9F9F7] h-[60px]">
                <TableHead className="sticky left-0 z-10 pl-[25px] bg-[#F9F9F7] text-[16px] font-medium">
                  Full Name
                </TableHead>
                <TableHead className="text-[16px] font-medium">
                  Total Assigned
                </TableHead>
                <TableHead className="text-[16px] font-medium">
                  Completed
                </TableHead>
                <TableHead className="text-[16px] font-medium">
                  Pending
                </TableHead>
                <TableHead className="text-[16px] font-medium">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="bg-white">
              {[...Array(5)].map((_, rowIndex) => (
                <TableRow key={rowIndex} className="h-[60px]">
                  <TableCell className="sticky left-0 z-10 pl-[25px] bg-white">
                    <Skeleton className="h-5 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[50px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[50px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[50px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-7 w-[70px] rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (userReportData?.data?.length ?? 0) > 0 ? (
        <div className="w-full overflow-x-auto pb-1">
          <Table className="table-fixed min-w-[1000px]">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[25%]" />
            </colgroup>

            <TableHeader>
              <TableRow className="bg-[#F9F9F7] h-[60px]">
                <TableHead className="sticky left-0 z-10 pl-[25px] bg-[#F9F9F7] text-[16px] font-medium">
                  Full Name
                </TableHead>
                <TableHead className="text-[16px] font-medium">
                  Total Assigned
                </TableHead>
                <TableHead className="text-[16px] font-medium">
                  Completed
                </TableHead>
                <TableHead className="text-[16px] font-medium">
                  Pending
                </TableHead>
                <TableHead className="text-[16px] font-medium">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="bg-white">
              {userReportData?.data?.map((user, index) => (
                <TableRow key={index} className="h-[60px]">
                  <TableCell className="sticky left-0 z-10 pl-[25px] bg-white text-[16px] text-[#2A2829] truncate">
                    {user.fullname}
                  </TableCell>
                  <TableCell className="text-[16px]">
                    {user.totalAssigned}
                  </TableCell>
                  <TableCell className="text-[16px]">
                    {user.completed}
                  </TableCell>
                  <TableCell className="text-[16px]">{user.pending}</TableCell>
                  <TableCell className="text-[16px]">
                    <Badge
                      variant={
                        user.status === "DONE"
                          ? "done"
                          : user.status === "NOT DONE"
                          ? "notDone"
                          : "nullValue"
                      }
                      className="capitalize px-3 py-1"
                    >
                      {formatText(user.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyAssessmentTab />
      )}
    </TabsContent>
  );
};

export default UserReportTab;
