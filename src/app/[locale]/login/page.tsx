import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CLIENT_SESSION_COOKIE } from "@/lib/client-auth";
import { buildLocalizedPath, toLocale } from "@/lib/i18n";
import { LoginFlow } from "@/components/login-flow";

export const metadata: Metadata = {
  title: "Connexion — TRAME",
  description:
    "Connectez-vous avec votre numéro de téléphone pour accéder à votre compte TRAME.",
};

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const cookieStore = await cookies();

  if (cookieStore.get(CLIENT_SESSION_COOKIE)) {
    redirect(buildLocalizedPath("/compte", locale));
  }

  return <LoginFlow />;
}
