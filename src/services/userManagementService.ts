import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { HttpService } from "./httpService";

class UserManagementService {
  private request = new HttpService();

  async getAllUsers(filters?: {
    search?: string;
    status?: string;
    limit?: number;
    page?: number;
  }) {
    const query = new URLSearchParams();

    if (filters?.search) query.append("search", filters.search);
    if (filters?.status) query.append("status", filters.status);
    if (filters?.limit) query.append("limit", String(filters.limit));
    if (filters?.page) query.append("page", String(filters.page));

    return this.request.get(
      `/users?${query.toString()}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const userManagementService = new UserManagementService();
export default userManagementService;
