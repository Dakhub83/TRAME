import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Connexion — Administration TRAME",
};

async function login(formData: FormData) {
  "use server";

  const code = formData.get("code");
  const expected = process.env.ADMIN_ACCESS_CODE;

  if (expected && code === expected) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    redirect("/admin/dispatch");
  }

  redirect("/admin/login?error=1");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl border border-graphite-line bg-graphite p-8"
      >
        <p className="font-data text-xs uppercase tracking-widest text-teal">Trame Ops</p>
        <h1 className="mt-2 font-display text-xl font-bold text-titanium">
          Accès administrateur
        </h1>
        <p className="mt-2 text-sm text-titanium-dim">
          Code d&apos;accès requis pour le centre de dispatching.
        </p>

        <input
          type="password"
          name="code"
          placeholder="Code d'accès"
          required
          autoFocus
          className="mt-6 w-full rounded-xl border border-graphite-line bg-obsidian px-4 py-3 font-data text-sm text-titanium placeholder:text-titanium-dim focus:border-teal focus:outline-none"
        />

        {error && (
          <p className="mt-3 font-data text-xs text-amber">Code incorrect. Réessayez.</p>
        )}

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-teal px-4 py-3 font-data text-xs font-bold uppercase tracking-widest text-obsidian"
        >
          Entrer
        </button>
      </form>
    </div>
  );
}
