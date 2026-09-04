"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact TRAME — ${name || "Sans nom"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:contact@trame.bf?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="font-data text-[11px] text-titanium-dim">
          NOM
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <label htmlFor="message" className="font-data text-[11px] text-titanium-dim">
          MESSAGE
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-none rounded-lg border border-graphite-line bg-graphite px-3.5 py-2.5 text-sm text-titanium outline-none focus:border-teal"
        />
      </div>
      <button
        type="submit"
        className="mt-1 self-start rounded-xl bg-teal px-6 py-3 font-semibold text-obsidian"
      >
        Envoyer
      </button>
    </form>
  );
}
