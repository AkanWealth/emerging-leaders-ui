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
import { TabsContent } from "@/components/ui/tabs";
import { AssessmentListResponse } from "@/hooks/admin/assessment/useAssessmentList";
import { formatNumber } from "@/utils/formatText";
import EmptyAssessmentTab from "./EmptyAssessmentTab";

type AssessmentTabProp = {
  assessmentData: AssessmentListResponse | undefined;
  isLoading: boolean;
};

const AssessmentTab = ({ assessmentData, isLoading }: AssessmentTabProp) => {
  console.log(assessmentData?.data);
  return (
    <TabsContent
      value="assessment-list"
      className="flex-1 min-h-0 h-full border-t py-[20px] rounded-[12px] shadow-[0_-4px_6px_-4px_rgba(0,0,0,0.25)]"
    >
      {isLoading ? (
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
            </TableRow>
          </TableHeader>

          <TableBody>
            {[...Array(8)].map((_, index) => (
              <TableRow key={index}>
                <TableCell className="px-[25px] py-3.5 w-full">
                  <Skeleton className="h-5 w-[180px]" />
                </TableCell>
                <TableCell className="whitespace-nowrap px-[25px] py-3.5">
                  <Skeleton className="h-5 w-[60px]" />
                </TableCell>
                <TableCell className="whitespace-nowrap px-[25px] py-3.5">
                  <Skeleton className="h-5 w-[60px]" />
                </TableCell>
                <TableCell className="whitespace-nowrap px-[25px] py-3.5">
                  <Skeleton className="h-5 w-[60px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
      ) : (assessmentData?.data?.length ?? 0) > 0 ? (
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
            </TableRow>
          </TableHeader>

          <TableBody>
            {assessmentData?.data?.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell className="font-medium px-[25px] py-3.5 w-full">
                  {mapMonthToLabel(assessment.scheduledMonth)}
                </TableCell>
                <TableCell className="whitespace-nowrap px-[25px] py-3.5 ">
                  {formatNumber(assessment.totalUsers)}
                </TableCell>
                <TableCell className="whitespace-nowrap px-[25px] py-3.5 ">
                  {formatNumber(assessment.filledUsers)}
                </TableCell>
                <TableCell className="whitespace-nowrap px-[25px] py-3.5 ">
                  {formatNumber(assessment.notFilledUsers)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyAssessmentTab />
      )}
    </TabsContent>
  );
};

export default AssessmentTab;

function mapMonthToLabel(month: string): string {
  switch (month) {
    case "January":
      return "January Assessments";
    case "February":
      return "February Assessments";
    case "March":
      return "March Assessments";
    case "April":
      return "April Assessments";
    case "May":
      return "May Assessments";
    case "June":
      return "June Assessments";
    case "July":
      return "July Assessments";
    case "August":
      return "August Assessments";
    case "September":
      return "September Assessments";
    case "October":
      return "October Assessments";
    case "November":
      return "November Assessments";
    case "December":
      return "December Assessments";
    default:
      return "Unknown Month";
  }
}