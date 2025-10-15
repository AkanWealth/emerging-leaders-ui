import Cookies from "js-cookie";

export enum COOKIE_NAMES {
  ADMIN_AUTH_TOKENS = "emerging_leaders_admin_auth_tokens",
  INVITE_EMAIL = "emerging_leaders_admin_invite_email",
  INVITE_CODE = "emerging_leaders_admin_invite_code",
  RESET_PASSWORD_EMAIL_AND_CODE = "emerging_leaders_admin_reset_password_email_and_code",
}

type ExtendedCookieOptions = Cookies.CookieAttributes & {
  expiresInMinutes?: number;
};

/**
 * Stores a value (string or object) in a cookie.
 */
export const setCookie = (
  key: COOKIE_NAMES,
  value: string | Record<string, unknown>,
  options: ExtendedCookieOptions = {}
): void => {
  const { expiresInMinutes, ...rest } = options;
  const finalOptions = { ...rest };

  if (expiresInMinutes !== undefined) {
    finalOptions.expires = expiresInMinutes / (24 * 60);
  }

  const cookieValue = typeof value === "string" ? value : JSON.stringify(value);
  Cookies.set(key, cookieValue, finalOptions);
};

/**
 * Retrieves a cookie and parses it if it's JSON.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCookie = <T = any>(key: COOKIE_NAMES): T | undefined => {
  const value = Cookies.get(key);
  if (!value) return undefined;

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as T; // fallback to plain string
  }
};

export const removeCookie = (key: COOKIE_NAMES): void => {
  Cookies.remove(key);
};
