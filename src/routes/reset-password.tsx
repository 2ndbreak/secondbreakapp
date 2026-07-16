import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — 2nd Break" },
      { name: "description", content: "Set a new password for your 2nd Break account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "error" | "ok"; msg?: string }>({ kind: "idle" });

  useEffect(() => {
    // Supabase auto-handles recovery tokens from the URL hash and fires a PASSWORD_RECOVERY event.
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    // Also unlock if session already established (arrival with hash already parsed).
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) return setStatus({ kind: "error", msg: "Password must be at least 6 characters." });
    if (password !== confirm) return setStatus({ kind: "error", msg: "Passwords do not match." });
    setStatus({ kind: "loading" });
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setStatus({ kind: "error", msg: error.message });
    setStatus({ kind: "ok", msg: "Password updated. Redirecting…" });
    setTimeout(() => navigate({ to: "/" }), 1200);
  }

  return (
    <section className="color-paper">
      <div className="mx-auto max-w-md px-4 py-24 sm:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-flame)]">Reset password</p>
        <h1 className="display mt-4 text-4xl text-[color:var(--color-plum)]">Set a new password.</h1>
        {!ready ? (
          <p className="mt-6 text-[color:var(--color-plum)]/80">Open the reset link from your email to continue.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-md border border-[color:var(--color-plum)]/25 p-6">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">New password</span>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">Confirm new password</span>
              <input type="password" required minLength={6} value={confirm} onChange={(e) => setConfirm(e.target.value)}
                className="mt-2 w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]" />
            </label>
            <button type="submit" disabled={status.kind === "loading"}
              className="w-full rounded-md bg-[color:var(--color-plum)] px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-flame)] disabled:opacity-60">
              {status.kind === "loading" ? "…" : "Update password"}
            </button>
            {status.kind === "error" && <p className="text-sm text-[color:var(--color-flame)]">{status.msg}</p>}
            {status.kind === "ok" && <p className="text-sm text-[color:var(--color-plum)]/80">{status.msg}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
