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
    completed?: string; // e.g., "0-20"
    goals?: string; // e.g., "101-300"
    streak?: string; // e.g., "21-50"
    limit?: number;
    page?: number;
  }) {
    const query = new URLSearchParams();

    if (filters?.search) query.append("search", filters.search);
    if (filters?.ranking) query.append("ranking", filters.ranking);
    if (filters?.completed) query.append("completed", filters.completed);
    if (filters?.goals) query.append("goals", filters.goals);
    if (filters?.streak) query.append("streak", filters.streak);
    if (filters?.limit) query.append("limit", String(filters.limit));
    if (filters?.page) query.append("page", String(filters.page));

    return this.request.get(
      `/analytics/admin/leaderboard?${query.toString()}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const analyticsService = new AnalyticsService();
export default analyticsService;
