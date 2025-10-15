import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { HttpService } from "./httpService";

class NotificationService {
  private request = new HttpService();

  async getUnreadNotificationCount() {
    return this.request.get(
      "/notifications/unread-count",
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async getUserNotifications() {
    return this.request.get("/notifications", COOKIE_NAMES.ADMIN_AUTH_TOKENS);
  }

  async markNotificationAsRead(notificationId: string) {
    return this.request.patch(
      `/notifications/${notificationId}/read`,
      {},
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async markAllNotificationAsRead() {
    return this.request.patch(
      "/notifications/mark-all-read",
      {},
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const notificationService = new NotificationService();
export default notificationService;
