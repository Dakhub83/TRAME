"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { requestOtpAction, verifyOtpAction } from "@/lib/actions/client-auth-actions";
import { passwordLoginAction } from "@/lib/actions/password-auth-actions";
import { buildLocalizedPath } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";

type Method = "otp" | "password";

function MethodTabs({ method, onChange }: { method: Method; onChange: (m: Method) => void }) {
  return (
    <div className="mt-6 flex rounded-xl border border-graphite-line bg-graphite-light p-1">
      {(
        [
          { key: "otp" as const, label: "Code à usage unique" },
          { key: "password" as const, label: "Mot de passe" },
        ]
      ).map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`flex-1 rounded-lg py-2 font-data text-[11px] uppercase tracking-wider transition-colors ${
            method === tab.key ? "bg-teal-dim text-teal" : "text-titanium-dim hover:text-titanium"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function OtpLogin() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<"identifier" | "code">("identifier");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function submitIdentifier(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await requestOtpAction(identifier);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setDevCode(result.devCode);
      setStep("code");
    });
  }

  function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await verifyOtpAction(identifier, code);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(buildLocalizedPath("/compte", locale));
    });
  }

  return step === "identifier" ? (
    <form onSubmit={submitIdentifier} className="mt-6 space-y-4">
      <p className="text-sm text-titanium-dim">
        Un compte est créé automatiquement si ce numéro ou cet email n&apos;existe pas encore.
      </p>
      <input
        type="text"
        autoComplete="username"
        required
        autoFocus
        placeholder="+226 70 12 34 56 ou vous@exemple.com"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="w-full rounded-xl border border-graphite-line bg-graphite-light px-4 py-3 font-data text-sm text-titanium placeholder:text-titanium-dim focus:border-teal focus:outline-none"
      />

      {error && <p className="font-data text-xs text-amber">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-teal py-3 font-bold uppercase tracking-wider text-obsidian transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
      >
        {isPending ? "Envoi…" : "Recevoir le code"}
      </button>
    </form>
  ) : (
    <form onSubmit={submitCode} className="mt-6 space-y-4">
      <p className="text-sm text-titanium-dim">
        Un code à usage unique a été envoyé à {identifier}.
      </p>

      {devCode && (
        <div className="rounded-xl border border-teal-dim bg-teal-dim/30 px-4 py-3 font-data text-xs text-teal">
          Mode démo — aucun SMS ni email envoyé. Votre code : <span className="font-bold">{devCode}</span>
        </div>
      )}

      <input
        type="text"
        inputMode="numeric"
        required
        autoFocus
        maxLength={6}
        placeholder="123456"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full rounded-xl border border-graphite-line bg-graphite-light px-4 py-3 text-center font-data text-lg tracking-[0.5em] text-titanium placeholder:tracking-normal placeholder:text-titanium-dim focus:border-teal focus:outline-none"
      />

      {error && <p className="font-data text-xs text-amber">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-teal py-3 font-bold uppercase tracking-wider text-obsidian transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
      >
        {isPending ? "Vérification…" : "Confirmer"}
      </button>

      <button
        type="button"
        onClick={() => {
          setStep("identifier");
          setCode("");
          setError(null);
        }}
        className="w-full text-center font-data text-[11px] text-titanium-dim hover:text-titanium"
      >
        Changer de numéro ou email
      </button>
    </form>
  );
}

function PasswordLogin() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await passwordLoginAction({ email, password });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(buildLocalizedPath("/compte", locale));
    });
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="login-email" className="font-data text-[11px] uppercase tracking-wider text-titanium">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-graphite-line bg-graphite-light px-4 py-3 text-sm text-titanium placeholder:text-titanium-dim focus:border-teal focus:outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="login-password" className="font-data text-[11px] uppercase tracking-wider text-titanium">
          Mot de passe
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-graphite-line bg-graphite-light px-4 py-3 text-sm text-titanium placeholder:text-titanium-dim focus:border-teal focus:outline-none"
        />
      </div>

      {error && <p className="font-data text-xs text-amber">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-teal py-3 font-bold uppercase tracking-wider text-obsidian transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
      >
        {isPending ? "Connexion…" : "Se connecter"}
      </button>

      <p className="text-center text-xs text-titanium-dim">
        Pas encore de compte ?{" "}
        <Link href={buildLocalizedPath("/signup", locale)} className="text-teal hover:underline">
          Créer un compte
        </Link>
      </p>
    </form>
  );
}

export function LoginFlow() {
  const [method, setMethod] = useState<Method>("otp");

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-graphite-line bg-graphite p-8">
        <p className="font-data text-xs uppercase tracking-widest text-teal">Connexion à Trame</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-titanium">
          {method === "otp" ? "Entrez votre numéro ou email" : "Connexion par mot de passe"}
        </h1>

        <MethodTabs method={method} onChange={setMethod} />

        {method === "otp" ? <OtpLogin /> : <PasswordLogin />}
      </div>
    </div>
  );
}
