import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { HttpService } from "./httpService";
import { UserGrowthPeriodType } from "@/app/(admin)/admin/dashboard/page";

class AnalyticsService {
  private request = new HttpService();

  async getUserGrowth(period: UserGrowthPeriodType) {
    return this.request.get(
      `/analytics/user-growth-chart?period=${period}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async getGrowthRecords() {
    return this.request.get(
      `/analytics/growth`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const analyticsService = new AnalyticsService();
export default analyticsService;
