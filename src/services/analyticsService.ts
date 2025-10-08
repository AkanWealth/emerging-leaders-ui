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
  async getLeaderBoardData(filters?: {
    search?: string;
    ranking?: "highest" | "lowest";
    projectsMin?: string | number;
    projectsMax?: string | number;
    budgetMin?: string | number;
    budgetMax?: string | number;
    savingsMin?: string | number;
    savingsMax?: string | number;
    streakMin?: string | number;
    streakMax?: string | number;
    goalsMin?: string | number;
    goalsMax?: string | number;
    completedMin?: string | number;
    completedMax?: string | number;
    limit?: number;
    page?: number;
  }) {
    const query = new URLSearchParams();

    // 🔍 Basic filters
    if (filters?.search) query.append("search", filters.search);
    if (filters?.ranking) query.append("ranking", filters.ranking);

    // 📊 Range filters (explicit)
    if (filters?.projectsMin !== undefined)
      query.append("projectsMin", String(filters.projectsMin));
    if (filters?.projectsMax !== undefined)
      query.append("projectsMax", String(filters.projectsMax));

    if (filters?.budgetMin !== undefined)
      query.append("budgetMin", String(filters.budgetMin));
    if (filters?.budgetMax !== undefined)
      query.append("budgetMax", String(filters.budgetMax));

    if (filters?.savingsMin !== undefined)
      query.append("savingsMin", String(filters.savingsMin));
    if (filters?.savingsMax !== undefined)
      query.append("savingsMax", String(filters.savingsMax));

    if (filters?.streakMin !== undefined)
      query.append("streakMin", String(filters.streakMin));
    if (filters?.streakMax !== undefined)
      query.append("streakMax", String(filters.streakMax));

    if (filters?.goalsMin !== undefined)
      query.append("goalsMin", String(filters.goalsMin));
    if (filters?.goalsMax !== undefined)
      query.append("goalsMax", String(filters.goalsMax));

    if (filters?.completedMin !== undefined)
      query.append("completedMin", String(filters.completedMin));
    if (filters?.completedMax !== undefined)
      query.append("completedMax", String(filters.completedMax));

    // 📄 Pagination
    if (filters?.limit !== undefined)
      query.append("limit", String(filters.limit));
    if (filters?.page !== undefined) query.append("page", String(filters.page));

    return this.request.get(
      `/analytics/admin/leaderboard?${query.toString()}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const analyticsService = new AnalyticsService();
export default analyticsService;
