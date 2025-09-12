import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { HttpService } from "./httpService";

class AdminService {
  private request = new HttpService();

  async getUser() {
    return this.request.get("/admin/me", COOKIE_NAMES.ADMIN_AUTH_TOKENS);
  }
}

const adminService = new AdminService();
export default adminService;
