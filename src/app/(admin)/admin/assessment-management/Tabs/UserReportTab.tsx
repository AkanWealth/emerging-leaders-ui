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

  const getBadgeStyle = (value: string | null) => {
    switch (value) {
      case "done":
        return "bg-[#E5FBEC] text-[#3DA755]";
      case "not done":
        return "bg-[#FFEDED] text-[#E81313]";
      case "null":
        return "bg-[#F3F3F1] text-[#65605C]";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <TabsContent value="user-report" className="flex-1 flex min-h-96">
      <div className="w-full overflow-x-auto">
        <Table className="table-fixed min-w-[1000px]">
          <colgroup>
            <col className="w-[200px]" /> {/* Full Name fixed width */}
            {months.map((_, i) => (
              <col key={i} className="w-[100px]" /> // each month fixed width
            ))}
          </colgroup>

          <TableHeader>
            <TableRow className="bg-[#F9F9F7] h-[60px]">
              <TableHead className="sticky left-0 z-10 text-[#2A2829] text-[16px] font-medium">
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
                <TableCell className="sticky left-0 z-10 text-[16px] text-[#2A2829] font-medium truncate">
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
