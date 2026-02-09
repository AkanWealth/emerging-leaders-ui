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
  const quarters = [
    { key: "Q1", label: "ASS- Q1" },
    { key: "Q2", label: "ASS- Q2" },
    { key: "Q3", label: "ASS- Q3" },
    { key: "Q4", label: "ASS- Q4" },
  ];

  return (
    <TabsContent value="user-report" className="flex-1 flex min-h-96">
      {isLoading ? (
        <div className="w-full overflow-x-auto pb-1">
          <Table className="table-fixed min-w-[1000px]">
            <colgroup>
              <col className="w-[200px]" />
              {quarters.map((_, i) => (
                <col key={i} className="w-[100px]" />
              ))}
            </colgroup>

            <TableHeader>
              <TableRow className="bg-[#F9F9F7] h-[60px]">
                <TableHead className="sticky left-0 z-10 pl-[25px] bg-[#F9F9F7] text-[16px] font-medium">
                  Full Name
                </TableHead>
                {quarters.map((quarter) => (
                  <TableHead
                    key={quarter.key}
                    className="text-[16px] font-medium"
                  >
                    {quarter.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="bg-white">
              {[...Array(5)].map((_, rowIndex) => (
                <TableRow key={rowIndex} className="h-[60px]">
                  <TableCell className="sticky left-0 z-10 pl-[25px] bg-white">
                    <Skeleton className="h-5 w-[150px]" />
                  </TableCell>
                  {quarters.map((quarter) => (
                    <TableCell key={quarter.key}>
                      <Skeleton className="h-7 w-[70px] rounded-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (userReportData?.data?.length ?? 0) > 0 ? (
        <div className="w-full overflow-x-auto pb-1">
          <Table className="table-fixed min-w-[1000px]">
            <colgroup>
              <col className="w-[200px]" /> {/* Full Name fixed width */}
              {quarters.map((_, i) => (
                <col key={i} className="w-[100px]" /> // each quarter fixed width
              ))}
            </colgroup>

            <TableHeader>
              <TableRow className="bg-[#F9F9F7] h-[60px]">
                <TableHead className="sticky left-0 z-10 pl-[25px] bg-[#F9F9F7] text-[16px] font-medium">
                  Full Name
                </TableHead>
                {quarters.map((quarter) => (
                  <TableHead
                    key={quarter.key}
                    className="text-[16px] font-medium"
                  >
                    {quarter.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="bg-white">
              {userReportData?.data?.map((user, index) => (
                <TableRow key={index} className="h-[60px]">
                  <TableCell className="sticky left-0 z-10 pl-[25px] bg-white text-[16px] text-[#2A2829] truncate">
                    {user.fullname}
                  </TableCell>
                  {quarters.map((quarter) => {
                    const value = (user[quarter.key as keyof typeof user] ??
                      "NULL") as string;
                    const normalizedValue = value.toLowerCase();

                    return (
                      <TableCell key={quarter.key} className="text-[16px]">
                        <Badge
                          variant={
                            normalizedValue === "done"
                              ? "done"
                              : normalizedValue === "not done"
                                ? "notDone"
                                : "nullValue"
                          }
                          className="capitalize px-3 py-1"
                        >
                          {formatText(value)}
                        </Badge>
                      </TableCell>
                    );
                  })}
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
