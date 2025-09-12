import { HttpService } from "./httpService";

class AuthService {
  private request = new HttpService();

  async signup(data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.request.post("/admin/auth/signup", data);
  }

  async signin(data: { email: string; password: string }) {
    return this.request.post("/admin/auth/login", {
      email: data.email,
      password: data.password,
    });
  }

  async verifyOtp(data: { email: string; otp: string }) {
    return this.request.post("/admin/auth/verify-otp", {
      email: data.email,
      otp: data.otp,
    });
  }

  async forgotPassword(data: { email: string }) {
    return this.request.post("/admin/auth/forgot-password", {
      email: data.email,
    });
  }

  async resetPassword(data: {
    email: string;
    otp: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    return this.request.post("admin/auth/reset-password", {
      email: data.email,
      otp: data.otp,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });
  }
}

const authService = new AuthService();
export default authService;
