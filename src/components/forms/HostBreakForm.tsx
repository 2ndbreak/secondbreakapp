import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function HostBreakForm() {
  const [form, setForm] = useState({ name: "", organisation: "", city: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function upd<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const payload = {
      name: form.name.trim(),
      organisation: form.organisation.trim() || null,
      city: form.city.trim(),
      email: form.email.trim(),
      message: form.message.trim() || null,
    };
    if (!payload.name || !payload.city || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) {
      setStatus("error");
      setError("Please fill your name, city, and a valid email.");
      return;
    }
    const { error } = await supabase.from("host_a_break_requests").insert(payload);
    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    setStatus("ok");
    setForm({ name: "", organisation: "", city: "", email: "", message: "" });
  }

  if (status === "ok") {
    return (
      <div className="rounded-md border-2 border-[color:var(--color-flame)] bg-[color:var(--color-paper)] p-8 text-[color:var(--color-plum)]">
        <p className="display text-2xl text-[color:var(--color-flame)]">Thank you — the 2nd Break team has received it.</p>
        <p className="mt-2 text-sm text-[color:var(--color-plum)]/70">We'll be in touch about hosting a break with you.</p>
      </div>
    );
  }

  const inputCls =
    "mt-1 block w-full rounded-md border border-[color:var(--color-plum)]/30 bg-white px-3 py-3 text-[color:var(--color-plum)] focus:border-[color:var(--color-flame)] focus:outline-none";
  const labelCls = "text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70";

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-[color:var(--color-plum)]/25 bg-[color:var(--color-paper)] p-6">
      <label className="block">
        <span className={labelCls}>Your name *</span>
        <input required value={form.name} onChange={(e) => upd("name", e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className={labelCls}>Organisation (optional)</span>
        <input value={form.organisation} onChange={(e) => upd("organisation", e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className={labelCls}>City *</span>
        <input required value={form.city} onChange={(e) => upd("city", e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className={labelCls}>Email *</span>
        <input required type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className={labelCls}>Tell us where you'd bring 2nd Break Day (optional)</span>
        <textarea rows={4} value={form.message} onChange={(e) => upd("message", e.target.value)} className={inputCls} />
      </label>
      {error && <p className="text-sm text-[color:var(--color-flame)]">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-md bg-[color:var(--color-flame)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] transition-colors hover:bg-[color:var(--color-plum)] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Host a break"}
      </button>
    </form>
  );
}
