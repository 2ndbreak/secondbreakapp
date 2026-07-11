import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FramedPhoto } from "@/components/site";
import { photos } from "@/data/entries";

export const Route = createFileRoute("/share")({
  head: () => ({
    meta: [
      { title: "Share a game or story — 2nd Break" },
      { name: "description", content: "Contribute a game or folktale to the 2nd Break archive. Consent-first, community-credited." },
      { property: "og:title", content: "Share a game or story — 2nd Break" },
      { property: "og:description", content: "Traditions belong to communities. We always say where a game or story comes from." },
    ],
  }),
  component: SharePage,
});

function SharePage() {
  const [submitted, setSubmitted] = useState(false);
  const [consentContent, setConsentContent] = useState(false);
  const [consentCommunity, setConsentCommunity] = useState(false);
  const [consentGuardian, setConsentGuardian] = useState(false);
  const [involvesMinors, setInvolvesMinors] = useState(false);

  const canSubmit = consentContent && consentCommunity && (!involvesMinors || consentGuardian);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="color-chartreuse">
        <div className="mx-auto max-w-2xl px-4 py-32 text-center sm:px-8">
          <h1 className="poster text-[color:var(--color-plum)]">Thank you.</h1>
          <p className="mt-6 text-lg text-[color:var(--color-plum)]/80">
            An editor will review your submission. Nothing publishes until consent is verified and the community credit is right.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="color-ice">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/60">Share a game or story</p>
            <h1 className="poster mt-4 text-[color:var(--color-plum)]">
              Traditions belong<br />to communities.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[color:var(--color-plum)]/80">
              We always say where a game or story comes from. Submissions are reviewed. Nothing publishes without consent.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto src={photos.clap.url} alt="Two friends playing a hand-clapping game — a shared tradition" className="aspect-[4/5]" rotate={1} />
          </div>
        </div>
      </section>

      <section className="color-paper">
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-8">
          <Fieldset legend="What you're sharing">
            <Field label="This is a…">
              <div className="flex gap-4">
                {[["game", "Game"], ["folktale", "Folktale"]].map(([v, l]) => (
                  <label key={v} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="type" value={v} required /> {l}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Title in the home language"><Input name="title_home" required /></Field>
            <Field label="Title in English"><Input name="title_en" /></Field>
            <Field label="Home language"><Input name="home_language" required placeholder="e.g. Sesotho" /></Field>
            <Field label="Province"><Input name="province" required placeholder="e.g. Free State" /></Field>
            <Field label="Community credit (required)">
              <Input name="community_credit" required placeholder="e.g. Basotho of QwaQwa" />
              <p className="mt-1 text-xs text-[color:var(--color-plum)]/60">Traditions belong to communities — we always say where a game or story comes from.</p>
            </Field>
          </Fieldset>

          <Fieldset legend="The content">
            <Field label="The story">
              <Textarea name="story" required rows={5} />
            </Field>
            <Field label="How to play (games only)">
              <Textarea name="how_to_play" rows={5} />
            </Field>
            <Field label="Why it matters"><Textarea name="why_it_matters" rows={3} /></Field>
            <Field label="Today — how might someone bring it back?"><Textarea name="today" rows={3} /></Field>
            <Field label="Video URL (optional)"><Input name="video_url" type="url" placeholder="YouTube link" /></Field>
          </Fieldset>

          <Fieldset legend="You">
            <Field label="Your name (as credited)"><Input name="contributor_name" required /></Field>
            <Field label="Contact email (never shown publicly)"><Input name="contact" type="email" required /></Field>
          </Fieldset>

          <Fieldset legend="Consent">
            <label className="flex items-start gap-3 text-sm text-[color:var(--color-plum)]/85">
              <input type="checkbox" required checked={consentContent} onChange={(e) => setConsentContent(e.target.checked)} className="mt-1" />
              <span>I confirm I have the right to share this content, and that the community it comes from is comfortable with it being preserved in the 2nd Break archive.</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-[color:var(--color-plum)]/85">
              <input type="checkbox" required checked={consentCommunity} onChange={(e) => setConsentCommunity(e.target.checked)} className="mt-1" />
              <span>I agree that the community credit above will appear publicly on this entry — always.</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-[color:var(--color-plum)]/85">
              <input type="checkbox" checked={involvesMinors} onChange={(e) => setInvolvesMinors(e.target.checked)} className="mt-1" />
              <span>This submission involves people under 18.</span>
            </label>
            {involvesMinors && (
              <label className="flex items-start gap-3 rounded-md border border-[color:var(--color-flame)]/40 bg-[color:var(--color-flame)]/5 p-4 text-sm text-[color:var(--color-plum)]">
                <input type="checkbox" required={involvesMinors} checked={consentGuardian} onChange={(e) => setConsentGuardian(e.target.checked)} className="mt-1" />
                <span>A guardian has consented for every minor involved.</span>
              </label>
            )}
          </Fieldset>

          <div>
            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-md bg-[color:var(--color-plum)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-flame)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit for review
            </button>
            <p className="mt-3 text-xs text-[color:var(--color-plum)]/60">
              Submissions enter as <strong>submitted</strong>. An editor reviews before publishing. Nothing goes live without verified consent.
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-[color:var(--color-plum)]/30 pt-6">
      <legend className="display text-2xl text-[color:var(--color-plum)]">{legend}</legend>
      <div className="mt-6 space-y-5">{children}</div>
    </fieldset>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 text-[color:var(--color-plum)] placeholder:text-[color:var(--color-plum)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]"
    />
  );
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 text-[color:var(--color-plum)] placeholder:text-[color:var(--color-plum)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]"
    />
  );
}
