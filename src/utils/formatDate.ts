import { format } from "date-fns";

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", // Jun
    day: "numeric", // 3
    year: "numeric", // 2025
  }).format(date);
}

export function formatToTime(createdAt: Date): string {
  return format(new Date(createdAt), "hh:mm a");
}
