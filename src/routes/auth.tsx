import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuthSession } from "@/hooks/useAuthSession";

const searchSchema = z.object({
  mode: z.enum(["login", "signup", "forgot"]).catch("login"),
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
    if (user && mode !== "forgot") navigate({ to: "/" });
  }, [user, navigate, mode]);

  async function handleGoogle() {
    setStatus({ kind: "loading" });
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return setStatus({ kind: "error", msg: result.error.message });
    if (result.redirected) return; // browser is navigating to Google
    setStatus({ kind: "ok", msg: "Signed in." });
    navigate({ to: "/" });
  }

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
    } else if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) return setStatus({ kind: "error", msg: error.message });
      setStatus({ kind: "ok", msg: "Check your email for a password reset link." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setStatus({ kind: "error", msg: error.message });
      setStatus({ kind: "ok", msg: "Signed in." });
      navigate({ to: "/" });
    }
  }

  const heading = mode === "signup" ? "JOIN THE PLAY." : mode === "forgot" ? "RESET YOUR PASSWORD." : "WELCOME BACK.";
  const kicker = mode === "signup" ? "Sign up" : mode === "forgot" ? "Forgot password" : "Log in";
  const submitLabel = mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Log in";

  return (
    <section className="color-paper">
      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-10 px-4 py-20 sm:px-8">
        <div className="col-span-12 md:col-span-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-flame)]">{kicker}</p>
          <h1 className="poster mt-4 text-[color:var(--color-plum)] break-words hyphens-none" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05 }}>{heading}</h1>
          <p className="mt-6 max-w-md text-[color:var(--color-plum)]/80">
            {mode === "signup"
              ? "Create an account to save entries and hear about the next 2nd Break Day."
              : mode === "forgot"
              ? "Enter the email you signed up with. We'll send you a link to set a new password."
              : "Sign in to your 2nd Break account."}
          </p>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="space-y-4 rounded-md border border-[color:var(--color-plum)]/25 p-6">
            {mode !== "forgot" && (
              <>
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={status.kind === "loading"}
                  className="flex w-full items-center justify-center gap-3 rounded-md border border-[color:var(--color-plum)]/30 bg-white px-5 py-3 text-sm font-semibold text-[color:var(--color-plum)] hover:bg-[color:var(--color-ice)] disabled:opacity-60"
                >
                  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Continue with Google
                </button>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[color:var(--color-plum)]/50">
                  <div className="h-px flex-1 bg-[color:var(--color-plum)]/20" /> or email <div className="h-px flex-1 bg-[color:var(--color-plum)]/20" />
                </div>
              </>
            )}
            <form onSubmit={handleEmail} className="space-y-4">
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
              {mode !== "forgot" && (
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
              )}
              <button
                type="submit"
                disabled={status.kind === "loading"}
                className="w-full rounded-md bg-[color:var(--color-plum)] px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-plum)] hover:bg-[color:var(--color-flame)] disabled:opacity-60"
              >
                {status.kind === "loading" ? "…" : submitLabel}
              </button>
              {status.kind === "error" && <p className="text-sm text-[color:var(--color-flame)]">{status.msg}</p>}
              {status.kind === "ok" && <p className="text-sm text-[color:var(--color-plum)]/80">{status.msg}</p>}
            </form>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">
              {mode === "login" && (
                <>
                  <Link to="/auth" search={{ mode: "forgot" }} className="text-[color:var(--color-flame)] underline">Forgot password?</Link>
                  <span>New here? <Link to="/auth" search={{ mode: "signup" }} className="text-[color:var(--color-flame)] underline">Create an account</Link></span>
                </>
              )}
              {mode === "signup" && (
                <span>Already have an account? <Link to="/auth" search={{ mode: "login" }} className="text-[color:var(--color-flame)] underline">Log in</Link></span>
              )}
              {mode === "forgot" && (
                <Link to="/auth" search={{ mode: "login" }} className="text-[color:var(--color-flame)] underline">Back to log in</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
