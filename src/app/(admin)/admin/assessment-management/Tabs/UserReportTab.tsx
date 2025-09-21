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
import { TabsContent } from "@/components/ui/tabs";
import userReportData from "@/data/userReportData";

const UserReportTable = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <TabsContent value="user-report" className="flex-1 flex min-h-96">
      <div className="w-full overflow-x-auto pb-1">
        <Table className="table-fixed min-w-[1000px]">
          <colgroup>
            <col className="w-[200px]" /> {/* Full Name fixed width */}
            {months.map((_, i) => (
              <col key={i} className="w-[100px]" /> // each month fixed width
            ))}
          </colgroup>

          <TableHeader>
            <TableRow className="bg-[#F9F9F7] h-[60px]">
              <TableHead className="sticky left-0 z-10 pl-[25px] bg-[#F9F9F7] text-[16px] font-medium">
                Full Name
              </TableHead>
              {months.map((month) => (
                <TableHead key={month} className="text-[16px] font-medium">
                  {month}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {userReportData.slice(0, 8).map((user, index) => (
              <TableRow key={index} className="h-[60px]">
                <TableCell className="sticky left-0 z-10 pl-[25px] bg-white text-[16px] text-[#2A2829] truncate">
                  {user.fullName}
                </TableCell>
                {months.map((month) => {
                  const value = (user[month as keyof typeof user] ??
                    "null") as string;
                  return (
                    <TableCell key={month} className="text-[16px]">
                      <Badge
                        variant={
                          value === "done"
                            ? "done"
                            : value === "not done"
                            ? "notDone"
                            : "nullValue"
                        }
                        className="capitalize px-3 py-1"
                      >
                        {value}
                      </Badge>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  );
};

export default UserReportTable;
