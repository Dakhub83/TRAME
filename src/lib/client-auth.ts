/**
 * Placeholder passenger auth: a one-time code sent to either a phone number
 * or an email address, no SMS/email provider wired up yet. `issueOtp` hands
 * the code straight back to the caller (and logs it) instead of actually
 * delivering it — swap that one function for a real SMS/email API call when
 * ready, everything else here can stay as-is.
 *
 * OTP codes live in an in-memory Map (survives Turbopack hot-reload via
 * globalThis, but not a server restart) rather than the database — there's
 * no reachable Postgres instance in this environment yet. Move this to a
 * real OtpCode/User/Session table set before relying on it in production.
 */

const OTP_TTL_MS = 5 * 60 * 1000;

type OtpEntry = { code: string; expiresAt: number };

declare global {
  var __trameOtpStore: Map<string, OtpEntry> | undefined;
}

const otpStore = globalThis.__trameOtpStore ?? new Map<string, OtpEntry>();
globalThis.__trameOtpStore = otpStore;

export const CLIENT_SESSION_COOKIE = "trame_client_session";

export type IdentifierType = "phone" | "email";

export function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, "");
}

export function isValidPhone(raw: string): boolean {
  return raw.replace(/\D/g, "").length >= 8;
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
}

/**
 * Accepts whatever the user typed and figures out whether it's a phone
 * number or an email address, returning the normalized value to key OTPs
 * and the session cookie on — or null if it's neither.
 */
export function classifyIdentifier(
  raw: string
): { type: IdentifierType; value: string } | null {
  const trimmed = raw.trim();

  if (trimmed.includes("@")) {
    const email = trimmed.toLowerCase();
    return isValidEmail(email) ? { type: "email", value: email } : null;
  }

  const phone = normalizePhone(trimmed);
  return isValidPhone(phone) ? { type: "phone", value: phone } : null;
}

export function issueOtp(identifier: string): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(identifier, { code, expiresAt: Date.now() + OTP_TTL_MS });
  console.log(`[OTP demo] ${identifier} -> ${code}`);
  return code;
}

export function checkOtp(identifier: string, code: string): boolean {
  const entry = otpStore.get(identifier);
  if (!entry) return false;

  const valid = entry.code === code && Date.now() <= entry.expiresAt;
  if (valid) otpStore.delete(identifier);
  return valid;
}
