import { createFileRoute } from "@tanstack/react-router";
import { FramedPhoto } from "@/components/site";
import { photos } from "@/data/entries";

// TODO: Replace with your published Google Form embed URL (Send → Embed HTML).
const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf-REPLACE_ME/viewform?embedded=true";

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
  return (
    <>
      <section className="color-ice">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-20 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/60">Share</p>
            <h1 className="poster mt-4 text-[color:var(--color-plum)]">
              Every game<br />comes from<br />
              <span className="text-[color:var(--color-flame)]">somebody.</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg text-[color:var(--color-plum)]/80">
              Fill in the form below. Nothing publishes until we've spoken to you, verified consent, and credited the community properly.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[color:var(--color-plum)]/80">
              <li>· We always say where a game or story comes from.</li>
              <li>· You can withdraw an entry at any time.</li>
              <li>· If a story involves minors, we ask for guardian consent.</li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto src={photos.clap.url} alt={photos.clap.alt} className="aspect-[4/5]" rotate={-1.5} />
          </div>
        </div>
      </section>

      <section className="color-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
          <div className="rounded-md border border-[color:var(--color-plum)]/20 bg-white overflow-hidden">
            <iframe
              src={GOOGLE_FORM_EMBED_URL}
              title="2nd Break — Share a game or story"
              width="100%"
              height="1400"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              loading="lazy"
              className="block w-full"
            >
              Loading form…
            </iframe>
          </div>
          <p className="mt-4 text-xs text-[color:var(--color-plum)]/60">
            Trouble seeing the form? <a className="underline" href={GOOGLE_FORM_EMBED_URL.replace("?embedded=true", "")} target="_blank" rel="noreferrer noopener">Open it in a new tab</a>.
          </p>
        </div>
      </section>
    </>
  );
}
