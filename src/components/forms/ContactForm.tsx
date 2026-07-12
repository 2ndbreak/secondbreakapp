import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function upd<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const payload = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
    if (!payload.name || !payload.message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) {
      setStatus("error");
      setError("Please fill your name, a valid email, and a message.");
      return;
    }
    const { error } = await supabase.from("contact_messages").insert(payload);
    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    setStatus("ok");
    setForm({ name: "", email: "", message: "" });
  }

  if (status === "ok") {
    return (
      <div className="rounded-md border-2 border-[color:var(--color-flame)] bg-[color:var(--color-paper)] p-8 text-[color:var(--color-plum)]">
        <p className="display text-2xl text-[color:var(--color-flame)]">Thank you — the 2nd Break team has received it.</p>
      </div>
    );
  }

  const inputCls =
    "mt-1 block w-full rounded-md border border-[color:var(--color-plum)]/30 bg-white px-3 py-3 text-[color:var(--color-plum)] focus:border-[color:var(--color-flame)] focus:outline-none";
  const labelCls = "text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70";

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-[color:var(--color-plum)]/25 bg-white p-6">
      <label className="block">
        <span className={labelCls}>Name *</span>
        <input required value={form.name} onChange={(e) => upd("name", e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className={labelCls}>Email *</span>
        <input required type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className={labelCls}>Message *</span>
        <textarea required rows={6} value={form.message} onChange={(e) => upd("message", e.target.value)} className={inputCls} />
      </label>
      {error && <p className="text-sm text-[color:var(--color-flame)]">{error}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-md bg-[color:var(--color-flame)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] transition-colors hover:bg-[color:var(--color-plum)] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
