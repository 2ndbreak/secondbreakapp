import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function PlaygroundSignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const trimmed = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    const { error } = await supabase.from("playground_signups").insert({ email: trimmed });
    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    setStatus("ok");
    setEmail("");
  }

  if (status === "ok") {
    return (
      <div className="rounded-md border-2 border-[color:var(--color-chartreuse)] bg-[color:var(--color-plum)] p-6 text-[color:var(--color-ice)]">
        <p className="display text-2xl text-[color:var(--color-chartreuse)]">Thank you — the 2nd Break team has received it.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-md border border-[color:var(--color-plum)]/25 bg-[color:var(--color-paper)] p-4 sm:p-6">
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">Your email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-[color:var(--color-plum)]/30 bg-white px-3 py-3 text-[color:var(--color-plum)] focus:border-[color:var(--color-flame)] focus:outline-none"
          placeholder="you@example.com"
        />
      </label>
      {error && <p className="mt-2 text-sm text-[color:var(--color-flame)]">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[color:var(--color-plum)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] transition-colors hover:bg-[color:var(--color-flame)] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Join the playground"}
      </button>
    </form>
  );
}
