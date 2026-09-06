import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CLIENT_SESSION_COOKIE } from "@/lib/client-auth";
import { logoutAction } from "@/lib/actions/client-auth-actions";
import { buildLocalizedPath, toLocale } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { ProfileDashboard } from "@/components/profile-dashboard";

export const metadata: Metadata = {
  title: "Mon compte — TRAME",
};

const TIER_LABELS: Record<string, string> = {
  STANDARD: "Membre TRAME",
  PRIVILEGE: "Membre TRAME Privilège",
  ELITE: "Membre TRAME Élite",
};

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const cookieStore = await cookies();
  const identifier = cookieStore.get(CLIENT_SESSION_COOKIE)?.value;

  if (!identifier) {
    redirect(buildLocalizedPath("/login", locale));
  }

  let displayName = identifier;
  let memberSince: string | null = null;
  let loyaltyPoints = 0;
  let tierLabel = TIER_LABELS.STANDARD;
  let hasLinkedAccount = false;

  try {
    const user = await prisma.user.findUnique({
      where: { email: identifier },
      include: { loyaltyAccount: true },
    });

    if (user) {
      hasLinkedAccount = true;
      displayName = user.fullName;
      memberSince = new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(user.createdAt);
      loyaltyPoints = user.loyaltyAccount?.accumulatedPoints ?? 0;
      tierLabel = TIER_LABELS[user.loyaltyAccount?.tierStatus ?? "STANDARD"];
    }
  } catch (error) {
    // No matching password-based account (this session may be an OTP
    // login with no real User row), or the database is unreachable — this
    // is an expected, handled fallback in the current dual-auth setup, not
    // a crash, so it's a warning rather than an error: console.error here
    // would make Next's dev overlay treat a normal fallback path as a
    // blocking failure.
    console.warn("Falling back to identifier-only profile view:", error);
  }

  async function logout() {
    "use server";
    await logoutAction();
    redirect(buildLocalizedPath("/login", locale));
  }

  return (
    <ProfileDashboard
      displayName={displayName}
      identifier={identifier}
      memberSince={memberSince}
      loyaltyPoints={loyaltyPoints}
      tierLabel={tierLabel}
      hasLinkedAccount={hasLinkedAccount}
      onLogout={logout}
    />
  );
}
