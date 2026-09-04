"use client";

import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, message }),
      });

      const body = await response.json();

      if (!response.ok || !body.success) {
        setState("error");
        setErrorMessage(body?.error?.message ?? "Une erreur est survenue.");
        return;
      }

      setState("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setState("error");
      setErrorMessage("Impossible de contacter le serveur. Réessayez.");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-teal bg-teal-dim px-6 py-8 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-teal font-data text-teal">
          ✓
        </div>
        <p className="mt-4 font-display text-base font-semibold text-teal">
          Message envoyé
        </p>
        <p className="mt-2 text-sm text-titanium-dim">
          Notre équipe vous répondra sous peu.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 font-data text-xs text-teal hover:opacity-80"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="fullName" className="font-data text-[11px] text-titanium-dim">
          NOM
        </label>
        <input
          id="fullName"
          required
          minLength={2}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-graphite-line bg-graphite px-3.5 py-2.5 text-sm text-titanium outline-none focus:border-teal"
        />
      </div>
      <div>
        <label htmlFor="email" className="font-data text-[11px] text-titanium-dim">
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-graphite-line bg-graphite px-3.5 py-2.5 text-sm text-titanium outline-none focus:border-teal"
        />
      </div>
      <div>
        <label htmlFor="phone" className="font-data text-[11px] text-titanium-dim">
          TÉLÉPHONE
        </label>
        <input
          id="phone"
          type="tel"
          required
          placeholder="+226 70 12 34 56"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-graphite-line bg-graphite px-3.5 py-2.5 text-sm text-titanium outline-none focus:border-teal"
        />
      </div>
      <div>
        <label htmlFor="message" className="font-data text-[11px] text-titanium-dim">
          MESSAGE
        </label>
        <textarea
          id="message"
          required
          minLength={10}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-none rounded-lg border border-graphite-line bg-graphite px-3.5 py-2.5 text-sm text-titanium outline-none focus:border-teal"
        />
      </div>

      {state === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-1 self-start rounded-xl bg-teal px-6 py-3 font-semibold text-obsidian shadow-[0_0_20px_-6px_var(--color-teal)] transition-[opacity,box-shadow] hover:shadow-[0_0_28px_-4px_var(--color-teal)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "submitting" ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
