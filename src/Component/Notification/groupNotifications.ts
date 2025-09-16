import { format, isToday, isYesterday, differenceInDays } from "date-fns";

type Notification = {
  id: string;
  message: string;
  createdAt: Date; // now Date, not string
};

export function groupNotifications(notifications: Notification[]) {
  const groups: Record<string, Notification[]> = {};

  notifications.forEach((notif) => {
    const date = notif.createdAt; // already a Date object

    let group = "";
    if (isToday(date)) {
      group = "Today";
    } else if (isYesterday(date)) {
      group = "Yesterday";
    } else if (differenceInDays(new Date(), date) <= 7) {
      group = "Last Week";
    } else if (differenceInDays(new Date(), date) <= 30) {
      group = "Last Month";
    } else {
      group = format(date, "MMMM yyyy"); // fallback e.g. "June 2025"
    }

    if (!groups[group]) groups[group] = [];
    groups[group].push(notif);
  });

  return groups;
}
