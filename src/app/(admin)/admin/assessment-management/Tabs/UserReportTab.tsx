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
      <Table className="table-auto w-full h-full bg-blue-500">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">Full Name</TableHead>
            {months.map((month) => (
              <TableHead key={month} className="px-4 py-2 text-center">
                {month}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* NOTE: Displaying only the first 8 assessments, as the design specifies pagination in pages of 8 items. */}
          {userReportData.slice(0, 8).map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium px-4 py-2">
                {user.fullName}
              </TableCell>
              {months.map((month) => (
                <TableCell key={month} className="px-4 py-2 text-center">
                  {user[month as keyof typeof user] ?? "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabsContent>
  );
};

export default UserReportTable;
