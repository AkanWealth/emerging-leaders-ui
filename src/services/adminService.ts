import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { HttpService } from "./httpService";

class AdminService {
  private request = new HttpService();

  async getUser() {
    return this.request.get("/admin/users/me", COOKIE_NAMES.ADMIN_AUTH_TOKENS);
  }
  async editUser(
    loggedInUserId: string,
    payload: {
      firstname: string;
      lastname: string;
      email: string;
      Address: string;
      city: string;
      country: string;
      postalcode: string;
      phone: string;
    }
  ) {
    return this.request.patch(
      `/admin/users/${loggedInUserId}`,
      payload,
      COOKIE_NAMES.ADMIN_AUTH_TOKENS
    );
  }
}

const adminService = new AdminService();
export default adminService;
