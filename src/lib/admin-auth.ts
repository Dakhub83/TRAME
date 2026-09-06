/**
 * Placeholder admin gate for the isolated (admin) route group.
 *
 * This is NOT real authentication: there's no user identity, no roles, no
 * per-account audit trail — just a single shared passcode (ADMIN_ACCESS_CODE)
 * that unlocks a cookie every request checks. It exists so /admin/* isn't
 * wide open while this app has no auth system at all. Replace with real
 * sessions + a User/Role model before any real dispatcher relies on this.
 */
export const ADMIN_SESSION_COOKIE = "trame_admin_session";
export const ADMIN_SESSION_VALUE = "granted";
export const ADMIN_LOGIN_PATH = "/admin/login";

export function isAdminAuthorized(cookieValue: string | undefined): boolean {
  return cookieValue === ADMIN_SESSION_VALUE;
}
