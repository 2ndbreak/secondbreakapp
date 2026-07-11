import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSession } from "@/hooks/useAuthSession";

const searchSchema = z.object({
  mode: z.enum(["login", "signup"]).catch("login"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Log in or sign up — 2nd Break" },
      { name: "description", content: "Log in or create an account to save entries and join the 2nd Break community." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuthSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "error" | "ok"; msg?: string }>({ kind: "idle" });

  useEffect(() => {
    if (user) navigate({ to: "/" });
  }, [user, navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "loading" });
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) return setStatus({ kind: "error", msg: error.message });
      setStatus({ kind: "ok", msg: "Check your email to confirm your account." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setStatus({ kind: "error", msg: error.message });
      setStatus({ kind: "ok", msg: "Signed in." });
      navigate({ to: "/" });
    }
  }

  return (
    <section className="color-paper">
      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-10 px-4 py-20 sm:px-8">
        <div className="col-span-12 md:col-span-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-flame)]">
            {mode === "signup" ? "Sign up" : "Log in"}
          </p>
          <h1 className="poster mt-4 text-[color:var(--color-plum)] break-words">
            {mode === "signup" ? "Join the playground." : "Welcome back."}
          </h1>
          <p className="mt-6 max-w-md text-[color:var(--color-plum)]/80">
            {mode === "signup"
              ? "Create an account to save entries and hear about the next 2nd Break Day."
              : "Sign in to your 2nd Break account."}
          </p>
        </div>
        <div className="col-span-12 md:col-span-6">
          <form onSubmit={handleEmail} className="space-y-4 rounded-md border border-[color:var(--color-plum)]/25 p-6">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">Password</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]"
              />
            </label>
            <button
              type="submit"
              disabled={status.kind === "loading"}
              className="w-full rounded-md bg-[color:var(--color-plum)] px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-flame)] disabled:opacity-60"
            >
              {status.kind === "loading" ? "…" : mode === "signup" ? "Create account" : "Log in"}
            </button>
            {status.kind === "error" && (
              <p className="text-sm text-[color:var(--color-flame)]">{status.msg}</p>
            )}
            {status.kind === "ok" && (
              <p className="text-sm text-[color:var(--color-plum)]/80">{status.msg}</p>
            )}
            <p className="pt-2 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">
              {mode === "signup" ? (
                <>Already have an account? <Link to="/auth" search={{ mode: "login" }} className="text-[color:var(--color-flame)] underline">Log in</Link></>
              ) : (
                <>New here? <Link to="/auth" search={{ mode: "signup" }} className="text-[color:var(--color-flame)] underline">Create an account</Link></>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}