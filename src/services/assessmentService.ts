import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { HttpService } from "./httpService";
import { UserReportFilters } from "@/hooks/admin/assessment/useUserReport";
import { AssessmentListFilters } from "@/hooks/admin/assessment/useAssessmentList";


class AssessmentService {
  private request = new HttpService();

  async getUserReport(filters: UserReportFilters) {
    const query = new URLSearchParams();

    if (filters?.search) query.append("search", filters.search);
    if (filters?.limit !== undefined)
      query.append("limit", String(filters.limit));
    if (filters.year !== undefined) query.append("year", String(filters.year));
    if (filters.page !== undefined) query.append("page", String(filters.page));
    return this.request.get(
      `/admin/users/assessment/report?${query.toString()}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }

  async getAssessmentList(filters: AssessmentListFilters) {
    const query = new URLSearchParams();

    if (filters?.search) query.append("search", filters.search);
    if (filters?.limit !== undefined)
      query.append("limit", String(filters.limit));
    if (filters.year !== undefined) query.append("year", String(filters.year));
    if (filters.page !== undefined) query.append("page", String(filters.page));
    return this.request.get(
      `/admin/users/assessment/summary?${query.toString()}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const assessmentService = new AssessmentService();
export default assessmentService;
