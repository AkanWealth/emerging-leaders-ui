"use client";

import { assessmentListData } from "@/data/assessmentListData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";

const AssessmentTable = () => {
  const handleView = (id: string) => {
    console.log("View assessment:", id);
    // TODO: show modal with assessment details
  };

  const handleDelete = (id: string) => {
    console.log("Delete assessment:", id);
    // TODO: ondelete assessment, open/show confirmation modal and then delete
  };

  return (
    <Table className="table-auto w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="bg-secondary-50 px-[25px] py-[18px] rounded-tl-2xl w-full">
            Title
          </TableHead>
          <TableHead className="bg-secondary-50 py-[18px] whitespace-nowrap px-[25px]">
            Total Users
          </TableHead>
          <TableHead className="bg-secondary-50 py-[18px] whitespace-nowrap px-[25px]">
            Filled
          </TableHead>
          <TableHead className="bg-secondary-50 py-[18px] whitespace-nowrap px-[25px]">
            Not Filled
          </TableHead>
          <TableHead className="bg-secondary-50 py-[18px] rounded-tr-2xl whitespace-nowrap px-[25px]">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* NOTE: Displaying only the first 8 assessments, as the design specifies pagination in pages of 8 items. */}
        {assessmentListData.slice(0, 8).map((assessment) => (
          <TableRow key={assessment.id}>
            <TableCell className="font-medium px-[25px] w-full">
              {assessment.title}
            </TableCell>
            <TableCell className="whitespace-nowrap px-[25px]">
              {assessment.totalUser}
            </TableCell>
            <TableCell className="whitespace-nowrap px-[25px]">
              {assessment.filled}
            </TableCell>
            <TableCell className="whitespace-nowrap px-[25px]">
              {assessment.notFilled}
            </TableCell>
            <TableCell className="whitespace-nowrap px-[25px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-[20px] shadow-[0px_8px_29px_0px_#5F5E5E30] p-0"
                >
                  <DropdownMenuItem
                    onClick={() => handleView(assessment.id)}
                    className="flex items-center gap-2.5 py-[18px] px-[25px]"
                  >
                    <Eye className="size-[18px]" />
                    View Responses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(assessment.id)}
                    className="flex items-center gap-2.5 py-[18px] px-[25px] text-error hover:text-error focus:text-error"
                  >
                    <Trash2 className="size-[18px] text-error" />
                    Delete Assessment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssessmentTable;
