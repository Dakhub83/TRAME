"use server";

import { cookies } from "next/headers";
import {
  CLIENT_SESSION_COOKIE,
  checkOtp,
  classifyIdentifier,
  issueOtp,
} from "@/lib/client-auth";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function requestOtpAction(rawIdentifier: string) {
  const identifier = classifyIdentifier(rawIdentifier);
  if (!identifier) {
    return { ok: false as const, error: "Numéro de téléphone ou email invalide." };
  }

  // Placeholder: no SMS/email provider wired up yet, so the code is handed
  // back to the caller instead of being delivered. See src/lib/client-auth.ts.
  const devCode = issueOtp(identifier.value);
  return { ok: true as const, identifier: identifier.value, devCode };
}

export async function verifyOtpAction(rawIdentifier: string, code: string) {
  const identifier = classifyIdentifier(rawIdentifier);
  if (!identifier || !checkOtp(identifier.value, code)) {
    return { ok: false as const, error: "Code invalide ou expiré." };
  }

  const cookieStore = await cookies();
  cookieStore.set(CLIENT_SESSION_COOKIE, identifier.value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return { ok: true as const };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(CLIENT_SESSION_COOKIE);
}
