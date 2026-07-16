import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SignupFormProps {
  source: string;
  showMessage?: boolean;
  messageLabel?: string;
  submitLabel?: string;
  tone?: "flame" | "plum" | "chartreuse";
}

export function SignupForm({
  source,
  showMessage = false,
  messageLabel = "Tell us more (optional)",
  submitLabel = "Count me in",
  tone = "flame",
}: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const btnBg =
    tone === "plum"
      ? "bg-[color:var(--color-plum)] text-[color:var(--color-plum)] hover:bg-[color:var(--color-flame)]"
      : tone === "chartreuse"
      ? "bg-[color:var(--color-chartreuse)] text-[color:var(--color-plum)] hover:bg-[color:var(--color-ice)]"
      : "bg-[color:var(--color-flame)] text-[color:var(--color-plum)] hover:bg-[color:var(--color-plum)]";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const { error } = await supabase.from("signups").insert({
      name: name.trim(),
      email: email.trim(),
      source,
      message: message.trim() || null,
    });
    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    setStatus("ok");
    setName("");
    setEmail("");
    setMessage("");
  }

  if (status === "ok") {
    return (
      <div className="rounded-md border-2 border-[color:var(--color-chartreuse)] bg-[color:var(--color-plum)] p-8 text-[color:var(--color-ice)]">
        <p className="display text-2xl text-[color:var(--color-chartreuse)]">You're in.</p>
        <p className="mt-2 text-sm text-[color:var(--color-ice)]/80">
          We'll be in touch. Take another break.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-md border border-[color:var(--color-plum)]/25 bg-[color:var(--color-paper)] p-6">
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">Name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-[color:var(--color-plum)]/30 bg-white px-3 py-3 text-[color:var(--color-plum)] focus:border-[color:var(--color-flame)] focus:outline-none"
          placeholder="Your name"
        />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-[color:var(--color-plum)]/30 bg-white px-3 py-3 text-[color:var(--color-plum)] focus:border-[color:var(--color-flame)] focus:outline-none"
          placeholder="you@example.com"
        />
      </label>
      {showMessage && (
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">{messageLabel}</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-[color:var(--color-plum)]/30 bg-white px-3 py-3 text-[color:var(--color-plum)] focus:border-[color:var(--color-flame)] focus:outline-none"
          />
        </label>
      )}
      {error && <p className="text-sm text-[color:var(--color-flame)]">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className={`inline-flex w-full items-center justify-center rounded-md px-6 py-4 text-sm font-semibold uppercase tracking-widest transition-colors disabled:opacity-60 ${btnBg}`}
      >
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
