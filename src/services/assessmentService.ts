import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { HttpService } from "./httpService";
import { UserGrowthPeriodType } from "@/app/(admin)/admin/dashboard/page";

class AssessmentService {
  private request = new HttpService();

  async getUserGrowth(period: UserGrowthPeriodType) {
    return this.request.get(
      `/analytics/user-growth-chart?period=${period}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const assessmentService = new AssessmentService();
export default assessmentService;
