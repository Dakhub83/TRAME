import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CLIENT_SESSION_COOKIE } from "@/lib/client-auth";
import { buildLocalizedPath, toLocale } from "@/lib/i18n";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Créer un compte — TRAME",
  description: "Créez votre compte TRAME pour réserver plus vite et suivre vos voyages.",
};

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const cookieStore = await cookies();

  if (cookieStore.get(CLIENT_SESSION_COOKIE)) {
    redirect(buildLocalizedPath("/compte", locale));
  }

  return <SignupForm />;
}
