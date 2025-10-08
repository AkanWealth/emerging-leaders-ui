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
      `/admin/users?${query.toString()}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }

  async deactivateUser(userId: string) {
    return this.request.patch(
      `/admin/users/${userId}/deactivate`,
      {},
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async reactivateUser(userId: string) {
    return this.request.patch(
      `/admin/users/${userId}/activate`,
      {},
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }

  async getAllAdmins(filters?: {
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
      `/admin/users/admins?${query.toString()}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async createAdmin(payload: {
    firstname?: string;
    lastname?: string;
    email: string;
  }) {
    return this.request.post(
      `/admin/auth/invite-admin`,
      payload,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }

  async editAdmin(
    adminId: string,
    payload: {
      firstname?: string;
      lastname?: string;
      email: string;
    }
  ) {
    return this.request.patch(
      `/admin/users/edit/${adminId}`,
      payload,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async resendAdminInvite(email: string) {
    return this.request.post(
      `/admin/auth/resend-invite`,
      { email },
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async deactivateAdmin(adminId: string) {
    return this.request.post(
      `/admin/users/${adminId}/deactivate-admin`,
      {},
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async reactivateAdmin(adminId: string) {
    return this.request.post(
      `/admin/users/${adminId}/activate-admin`,
      {},
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const userManagementService = new UserManagementService();
export default userManagementService;
