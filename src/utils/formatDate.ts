import { format } from "date-fns";

export function formatDate(date: Date | string): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    month: "short", // e.g., Jun
    day: "numeric", // e.g., 3
    year: "numeric", // e.g., 2025
  }).format(parsedDate);
}

export function formatToTime(createdAt: Date): string {
  return format(new Date(createdAt), "hh:mm a");
}
