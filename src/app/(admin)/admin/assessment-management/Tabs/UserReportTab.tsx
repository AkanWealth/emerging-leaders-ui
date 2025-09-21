"use client";

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
      <div className="w-full overflow-x-auto">
        <Table className="table-fixed min-w-[1000px]">
          <colgroup>
            <col className="w-[20%]" /> {/* Full Name */}
            {months.map((_, i) => (
              <col key={i} className="w-[6.5%]" /> // evenly distribute months
            ))}
          </colgroup>

          <TableHeader>
            <TableRow className="bg-[#F9F9F7] h-[60px]">
              <TableHead className="text-[#2A2829] text-[16px] font-medium">
                Full Name
              </TableHead>
              {months.map((month) => (
                <TableHead
                  key={month}
                  className="text-center text-[#2A2829] text-[16px] font-medium"
                >
                  {month}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {userReportData.slice(0, 8).map((user, index) => (
              <TableRow key={index} className="h-[60px]">
                <TableCell className="text-[16px] text-[#2A2829] truncate">
                  {user.fullName}
                </TableCell>
                {months.map((month) => (
                  <TableCell
                    key={month}
                    className="text-center text-[16px] text-[#2A2829]"
                  >
                    {user[month as keyof typeof user] ?? "null"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  );
};

export default UserReportTable;
