import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { HttpService } from "./httpService";
import { TicketStatus } from "@/app/(admin)/admin/support/SupportFilter";

class SupportService {
  private request = new HttpService();

  async getSupportTicket(filters?: {
    search?: string;
    status?: TicketStatus;
    limit?: number;
    page?: number;
  }) {
    const query = new URLSearchParams();

    if (filters?.search) query.append("search", filters.search);
    if (filters?.status) query.append("status", filters.status);
    if (filters?.limit) query.append("limit", String(filters.limit));
    if (filters?.page) query.append("page", String(filters.page));

    return this.request.get(
      `/tickets?${query.toString()}`,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async updateTicketStatus(id: string, status: TicketStatus) {
    return this.request.patch(
      `/tickets/${id}/status`,
      { status },
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
  async deleteTicket(id: string) {
    return this.request.delete(
      `/tickets/${id}`,
      undefined,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const supportService = new SupportService();
export default supportService;
