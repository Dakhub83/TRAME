"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupAction } from "@/lib/actions/password-auth-actions";
import { buildLocalizedPath } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";

const inputClasses =
  "w-full rounded-xl border border-graphite-line bg-graphite-light px-4 py-3 text-sm text-titanium placeholder:text-titanium-dim focus:border-teal focus:outline-none";
const labelClasses = "font-data text-[11px] uppercase tracking-wider text-titanium";

export function SignupForm() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    startTransition(async () => {
      const result = await signupAction({ fullName, email, phone, password });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(buildLocalizedPath("/compte", locale));
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-graphite-line bg-graphite p-8">
        <p className="font-data text-xs uppercase tracking-widest text-teal">Trame</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-titanium">Créer un compte</h1>
        <p className="mt-2 text-sm text-titanium-dim">
          Réservez plus vite et suivez vos voyages avec un compte TRAME.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="fullName" className={labelClasses}>Nom complet</label>
            <input
              id="fullName"
              required
              minLength={2}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className={labelClasses}>Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className={labelClasses}>Téléphone (optionnel)</label>
            <input
              id="phone"
              type="tel"
              placeholder="+226 70 12 34 56"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className={labelClasses}>Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className={labelClasses}>Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClasses}
            />
          </div>

          {error && <p className="font-data text-xs text-amber">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-teal py-3 font-bold uppercase tracking-wider text-obsidian transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
          >
            {isPending ? "Création…" : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-titanium-dim">
          Déjà un compte ?{" "}
          <Link href={buildLocalizedPath("/login", locale)} className="text-teal hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
