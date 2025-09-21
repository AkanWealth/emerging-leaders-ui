import getBaseUrl, { BaseUrlProdType } from "@/services/baseUrl";
import { COOKIE_NAMES, getCookie, setCookie } from "@/utils/cookiesUtils";

interface AuthTokenPair {
  accessToken: string;
  refreshToken: string;
}

interface HttpError {
  error: true;
  message: string;
}

export class HttpService {
  private baseUrl: string;
  private isRefreshing: Record<string, boolean> = {};

  constructor(env: BaseUrlProdType = "live") {
    this.baseUrl = getBaseUrl(env);
  }

  private async refreshAccessToken(
    cookieName: COOKIE_NAMES
  ): Promise<string | null> {
    if (this.isRefreshing[cookieName]) return null;

    this.isRefreshing[cookieName] = true;

    const tokens = getCookie<AuthTokenPair>(cookieName);
    if (!tokens?.refreshToken) {
      this.isRefreshing[cookieName] = false;
      return null;
    }
    console.log(tokens, "This are my tokens");
    try {
      const response = await fetch(`${this.baseUrl}/admin/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.refreshToken}`,
        },
      });

      if (!response.ok) throw new Error("Refresh token failed");

      const newTokens = await response.json();
      setCookie(cookieName, newTokens);

      return newTokens.accessToken;
    } catch (error) {
      console.error(`Token refresh failed for ${cookieName}:`, error);
      return null;
    } finally {
      this.isRefreshing[cookieName] = false;
    }
  }

  private async requestWithRetry<T>(
    method: "GET" | "POST" | "PATCH" | "DELETE",
    path: string,
    data: unknown = null,
    cookieName?: COOKIE_NAMES
  ): Promise<T | HttpError> {
    let token: string | undefined;

    if (cookieName) {
      const cookie = getCookie<AuthTokenPair>(cookieName);
      token = cookie?.accessToken;
    }

    const makeRequest = async (accessToken?: string) => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

      return fetch(`${this.baseUrl}${path}`, {
        method,
        headers,
        ...(method === "POST" || method === "PATCH"
          ? { body: JSON.stringify(data) }
          : {}),
      });
    };

    let response = await makeRequest(token);

    if (response.status === 401 && cookieName) {
      const newAccessToken = await this.refreshAccessToken(cookieName);
      if (newAccessToken) {
        response = await makeRequest(newAccessToken);
      } else {
        return { error: true, message: "Unauthorized and refresh failed" };
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return { error: true, message: error.message || "Request failed" };
    }

    return response.json() as Promise<T>;
  }

  async post<T>(
    path: string,
    data: unknown,
    cookieName?: COOKIE_NAMES
  ): Promise<T | HttpError> {
    return this.requestWithRetry<T>("POST", path, data, cookieName);
  }

  async get<T>(
    path: string,
    cookieName?: COOKIE_NAMES
  ): Promise<T | HttpError> {
    return this.requestWithRetry<T>("GET", path, undefined, cookieName);
  }

  async patch<T>(
    path: string,
    data: unknown,
    cookieName?: COOKIE_NAMES
  ): Promise<T | HttpError> {
    return this.requestWithRetry<T>("PATCH", path, data, cookieName);
  }

  async delete<T>(
    path: string,
    data: unknown,
    cookieName?: COOKIE_NAMES
  ): Promise<T | HttpError> {
    return this.requestWithRetry<T>("DELETE", path, data, cookieName);
  }

  async upload<T>(
    path: string,
    file: File,
    cookieName?: COOKIE_NAMES
  ): Promise<T | HttpError> {
    let token: string | undefined;

    if (cookieName) {
      const cookie = getCookie<AuthTokenPair>(cookieName);
      token = cookie?.accessToken;
    }

    const formData = new FormData();
    formData.append("image", file);

    const makeRequest = async (accessToken?: string) => {
      const headers: HeadersInit = {};
      if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

      return fetch(`${this.baseUrl}${path}`, {
        //return fetch(`https://seal-app-wzqhf.ondigitalocean.app${path}`, {
        //return fetch(`http://localhost:8000${path}`, {
        method: "POST",
        // headers,
        body: formData,
      });
    };

    let response = await makeRequest(token);

    if (response.status === 401 && cookieName) {
      const newAccessToken = await this.refreshAccessToken(cookieName);
      if (newAccessToken) {
        response = await makeRequest(newAccessToken);
      } else {
        return { error: true, message: "Unauthorized and refresh failed" };
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return { error: true, message: error.message || "Upload failed" };
    }

    return response.json() as Promise<T>;
  }
}
