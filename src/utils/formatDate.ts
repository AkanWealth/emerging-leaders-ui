export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", // Jun
    day: "numeric", // 3
    year: "numeric", // 2025
  }).format(date);
}
