import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const PROVINCES = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo",
  "Mpumalanga", "Northern Cape", "North West", "Western Cape", "Other / Cross-border",
];

type Form = {
  kind: "Game" | "Folktale" | "";
  language: string;
  province: string;
  community: string;
  title: string;
  story: string;
  how_played: string;
  why_mattered: string;
  how_lives_today: string;
  credit_name: string;
  contact_email: string;
  contact_phone: string;
  consent_publish: boolean;
  consent_elder: boolean;
  involves_minor: "" | "yes" | "no";
  guardian_consent: boolean;
};

const empty: Form = {
  kind: "",
  language: "",
  province: "",
  community: "",
  title: "",
  story: "",
  how_played: "",
  why_mattered: "",
  how_lives_today: "",
  credit_name: "",
  contact_email: "",
  contact_phone: "",
  consent_publish: false,
  consent_elder: false,
  involves_minor: "",
  guardian_consent: false,
};

export function ShareForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function upd<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function next() {
    setError(null);
    if (step === 1) {
      if (!form.kind || !form.language.trim() || !form.province || !form.community.trim()) {
        setError("Please complete all fields on this step.");
        return;
      }
    }
    if (step === 2) {
      if (!form.title.trim() || !form.story.trim()) {
        setError("Please give a title and tell us the story.");
        return;
      }
      if (form.kind === "Game" && !form.how_played.trim()) {
        setError("Please describe how the game is played.");
        return;
      }
    }
    if (step === 3) {
      if (!form.credit_name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contact_email.trim())) {
        setError("Please give your name and a valid email.");
        return;
      }
    }
    setStep((s) => s + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.consent_publish || !form.consent_elder || form.involves_minor === "") {
      setError("Please answer the consent questions.");
      return;
    }
    if (form.involves_minor === "yes" && !form.guardian_consent) {
      setError("Guardian consent is required when a minor is involved.");
      return;
    }
    setStatus("loading");
    const { error } = await supabase.from("share_submissions").insert({
      kind: form.kind,
      language: form.language.trim(),
      province: form.province,
      community: form.community.trim(),
      title: form.title.trim(),
      story: form.story.trim(),
      how_played: form.how_played.trim() || null,
      why_mattered: form.why_mattered.trim() || null,
      how_lives_today: form.how_lives_today.trim() || null,
      credit_name: form.credit_name.trim(),
      contact_email: form.contact_email.trim(),
      contact_phone: form.contact_phone.trim() || null,
      consent_publish: form.consent_publish,
      consent_elder: form.consent_elder,
      involves_minor: form.involves_minor === "yes",
      guardian_consent: form.guardian_consent,
    });
    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="rounded-md border-2 border-[color:var(--color-flame)] bg-[color:var(--color-paper)] p-8 text-[color:var(--color-plum)]">
        <p className="display text-2xl text-[color:var(--color-flame)]">Thank you — the 2nd Break team has received it.</p>
        <p className="mt-2 text-sm text-[color:var(--color-plum)]/70">Nothing will be published until we've spoken to you and verified consent.</p>
      </div>
    );
  }

  const inputCls =
    "mt-1 block w-full rounded-md border border-[color:var(--color-plum)]/30 bg-white px-3 py-3 text-[color:var(--color-plum)] focus:border-[color:var(--color-flame)] focus:outline-none";
  const labelCls = "text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70";

  return (
    <form onSubmit={submit} className="rounded-md border border-[color:var(--color-plum)]/25 bg-white p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-[color:var(--color-flame)]">Step {step} of 4</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className={`h-1.5 w-8 rounded-full ${n <= step ? "bg-[color:var(--color-flame)]" : "bg-[color:var(--color-plum)]/20"}`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="display text-2xl text-[color:var(--color-plum)]">What are you sharing?</h3>
          <div>
            <span className={labelCls}>Type *</span>
            <div className="mt-2 flex gap-3">
              {(["Game", "Folktale"] as const).map((k) => (
                <button
                  type="button"
                  key={k}
                  onClick={() => upd("kind", k)}
                  className={`rounded-md border px-4 py-3 text-sm uppercase tracking-widest ${
                    form.kind === k
                      ? "border-[color:var(--color-flame)] bg-[color:var(--color-flame)] text-[color:var(--color-chartreuse)]"
                      : "border-[color:var(--color-plum)]/30 text-[color:var(--color-plum)]"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className={labelCls}>Language *</span>
            <input required value={form.language} onChange={(e) => upd("language", e.target.value)} className={inputCls} placeholder="e.g. isiZulu, Sepedi, English" />
          </label>
          <label className="block">
            <span className={labelCls}>Province *</span>
            <select required value={form.province} onChange={(e) => upd("province", e.target.value)} className={inputCls}>
              <option value="">Choose a province…</option>
              {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Community it comes from *</span>
            <input required value={form.community} onChange={(e) => upd("community", e.target.value)} className={inputCls} placeholder="Township, village, family, region…" />
            <span className="mt-1 block text-xs text-[color:var(--color-plum)]/60">
              Traditions belong to communities — we always say where a game or story comes from.
            </span>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="display text-2xl text-[color:var(--color-plum)]">The {form.kind.toLowerCase() || "entry"}</h3>
          <label className="block">
            <span className={labelCls}>Title *</span>
            <input required value={form.title} onChange={(e) => upd("title", e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>The story *</span>
            <textarea required rows={5} value={form.story} onChange={(e) => upd("story", e.target.value)} className={inputCls} />
          </label>
          {form.kind === "Game" && (
            <label className="block">
              <span className={labelCls}>How it's played *</span>
              <textarea required rows={4} value={form.how_played} onChange={(e) => upd("how_played", e.target.value)} className={inputCls} placeholder="Number of players, materials, rules, songs…" />
            </label>
          )}
          <label className="block">
            <span className={labelCls}>Why it mattered</span>
            <textarea rows={3} value={form.why_mattered} onChange={(e) => upd("why_mattered", e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>How it lives today</span>
            <textarea rows={3} value={form.how_lives_today} onChange={(e) => upd("how_lives_today", e.target.value)} className={inputCls} />
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="display text-2xl text-[color:var(--color-plum)]">Credit & contact</h3>
          <p className="text-sm text-[color:var(--color-plum)]/70">Contact details are stored privately and never shown publicly.</p>
          <label className="block">
            <span className={labelCls}>Your name — as it should be credited *</span>
            <input required value={form.credit_name} onChange={(e) => upd("credit_name", e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Email *</span>
            <input required type="email" value={form.contact_email} onChange={(e) => upd("contact_email", e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Phone / WhatsApp (optional)</span>
            <input value={form.contact_phone} onChange={(e) => upd("contact_phone", e.target.value)} className={inputCls} />
          </label>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="display text-2xl text-[color:var(--color-plum)]">Consent</h3>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={form.consent_publish} onChange={(e) => upd("consent_publish", e.target.checked)} className="mt-1 h-5 w-5" />
            <span className="text-sm text-[color:var(--color-plum)]">2nd Break may publish this with my name credited.</span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={form.consent_elder} onChange={(e) => upd("consent_elder", e.target.checked)} className="mt-1 h-5 w-5" />
            <span className="text-sm text-[color:var(--color-plum)]">If an elder was recorded for this, they gave permission.</span>
          </label>
          <div className="rounded-md border border-[color:var(--color-plum)]/20 p-4">
            <span className={labelCls}>Does this involve anyone under 18? *</span>
            <div className="mt-2 flex gap-3">
              {(["yes", "no"] as const).map((v) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => upd("involves_minor", v)}
                  className={`rounded-md border px-4 py-2 text-sm uppercase tracking-widest ${
                    form.involves_minor === v
                      ? "border-[color:var(--color-flame)] bg-[color:var(--color-flame)] text-[color:var(--color-chartreuse)]"
                      : "border-[color:var(--color-plum)]/30 text-[color:var(--color-plum)]"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            {form.involves_minor === "yes" && (
              <label className="mt-4 flex items-start gap-3">
                <input type="checkbox" checked={form.guardian_consent} onChange={(e) => upd("guardian_consent", e.target.checked)} className="mt-1 h-5 w-5" />
                <span className="text-sm text-[color:var(--color-plum)]">A parent or guardian has given consent.</span>
              </label>
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-[color:var(--color-flame)]">{error}</p>}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="rounded-md border border-[color:var(--color-plum)]/30 px-5 py-3 text-sm uppercase tracking-widest text-[color:var(--color-plum)] disabled:opacity-40"
        >
          Back
        </button>
        {step < 4 ? (
          <button
            type="button"
            onClick={next}
            className="rounded-md bg-[color:var(--color-flame)] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-plum)]"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-md bg-[color:var(--color-flame)] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-plum)] disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
}
