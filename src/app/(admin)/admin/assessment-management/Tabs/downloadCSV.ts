import { AssessmentListType } from "@/hooks/admin/assessment/useAssessmentList";
import { UserReportType } from "@/hooks/admin/assessment/useUserReport";

/**
 * Escapes CSV values to handle commas, quotes, and newlines
 */
const escapeCSVValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  // If value contains comma, quote, or newline, wrap in quotes and escape existing quotes
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

/**
 * Converts Assessment List data to CSV format
 */
export const downloadAssessmentListCSV = (
  data: AssessmentListType[],
  year?: number,
) => {
  // Define headers
  const headers = [
    "Title",
    "Category",
    "Scheduled Month",
    "Scheduled Year",
    "Total Users",
    "Filled Users",
    "Not Filled Users",
    "Completion Rate",
    "Created At",
  ];

  // Create CSV rows
  const rows = data.map((item) => [
    escapeCSVValue(item.title),
    escapeCSVValue(item.category),
    escapeCSVValue(item.scheduledMonth),
    escapeCSVValue(item.scheduledYear),
    escapeCSVValue(item.totalUsers),
    escapeCSVValue(item.filledUsers),
    escapeCSVValue(item.notFilledUsers),
    escapeCSVValue(item.completionRate),
    escapeCSVValue(
      item.createdAt instanceof Date
        ? item.createdAt.toLocaleDateString()
        : new Date(item.createdAt).toLocaleDateString(),
    ),
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  const fileName = `assessment-list${year ? `-${year}` : ""}-${
    new Date().toISOString().split("T")[0]
  }.csv`;

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Converts User Report data to CSV format
 */
export const downloadUserReportCSV = (
  data: UserReportType[],
  year?: number,
) => {
  if (!data || data.length === 0) {
    alert("No data available to download");
    return;
  }

  // Define headers
  const headers = [
    "User ID",
    "Full Name",
    "Total Assigned",
    "Completed",
    "Pending",
    "Completion Rate",
    "Current Interval",
    "Status",
  ];

  // Create CSV rows
  const rows = data.map((item) => [
    escapeCSVValue(item.userId),
    escapeCSVValue(item.fullname),
    escapeCSVValue(item.totalAssigned),
    escapeCSVValue(item.completed),
    escapeCSVValue(item.pending),
    escapeCSVValue(item.completionRate),
    escapeCSVValue(item.currentInterval),
    escapeCSVValue(item.status),
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  const fileName = `user-report${year ? `-${year}` : ""}-${
    new Date().toISOString().split("T")[0]
  }.csv`;

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
