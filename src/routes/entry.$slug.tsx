import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { entries, fallbackPhoto, photos } from "@/data/entries";
import { FramedPhoto } from "@/components/site";

export const Route = createFileRoute("/entry/$slug")({
  loader: ({ params }) => {
    const entry = entries.find((e) => e.slug === params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Entry not found — 2nd Break" }, { name: "robots", content: "noindex" }] };
    }
    const { entry } = loaderData;
    const title = `${entry.title_home} (${entry.title_en}) — 2nd Break`;
    const desc = `${entry.type === "game" ? "A traditional game" : "A folktale"} of the ${entry.community_credit}, in ${entry.home_language}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: EntryNotFound,
  component: EntryPage,
});

function EntryNotFound() {
  const { slug } = Route.useParams();
  return (
    <section className="color-paper">
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="display text-5xl text-[color:var(--color-plum)]">No entry called "{slug}"</h1>
        <p className="mt-4 text-[color:var(--color-plum)]/70">The archive might not have this one yet — or the slug changed.</p>
        <Link to="/archive" className="mt-8 inline-block rounded-md bg-[color:var(--color-plum)] px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)]">
          Back to the archive
        </Link>
      </div>
    </section>
  );
}

type LangView = "home" | "en" | "both";

function EntryPage() {
  const { entry } = Route.useLoaderData();
  const [lang, setLang] = useState<LangView>("home");
  const heroPhoto =
    entry.slug === "morabaraba" ? photos.chessSuits :
    entry.slug === "diketo" ? photos.skip :
    entry.slug === "hare-and-the-baboons" ? photos.chessTaxi :
    fallbackPhoto(entry.category);

  const title =
    lang === "home" ? entry.title_home :
    lang === "en" ? entry.title_en :
    `${entry.title_home} · ${entry.title_en}`;

  const numColors = ["text-[color:var(--color-flame)]", "text-[color:var(--color-plum)]", "text-[color:var(--color-flame)]", "text-[color:var(--color-plum)]"];

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied.");
    } catch {
      /* no-op */
    }
  };

  return (
    <article className="color-paper">
      {entry.sample && (
        <div className="bg-[color:var(--color-chartreuse)] text-[color:var(--color-plum)] text-center text-xs uppercase tracking-widest py-2">
          SAMPLE — replace me
        </div>
      )}

      {/* Header */}
      <header className="mx-auto max-w-[1400px] px-4 pt-16 pb-8 sm:px-8">
        <Link to="/archive" className="text-xs uppercase tracking-widest text-[color:var(--color-flame)] hover:underline underline-offset-4">
          ← Back to the archive
        </Link>
        <div className="mt-6 grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-7">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest">
              <span className={`rounded-sm px-2 py-1 ${entry.type === "game" ? "bg-[color:var(--color-chartreuse)]" : "bg-[color:var(--color-ice)]"} text-[color:var(--color-plum)]`}>
                {entry.type}
              </span>
              <span className="text-[color:var(--color-plum)]/70">{entry.home_language}</span>
              <span className="text-[color:var(--color-plum)]/70">· {entry.province}</span>
              <span className="text-[color:var(--color-plum)]/70">· {entry.edition}</span>
            </div>
            <h1 className="poster mt-6 text-[color:var(--color-plum)]">{title}</h1>
            <p className="mt-6 text-lg text-[color:var(--color-plum)]/80">
              Shared by <span className="font-semibold text-[color:var(--color-plum)]">{entry.contributor_name}</span> · A tradition of the <span className="font-semibold text-[color:var(--color-plum)]">{entry.community_credit}</span>
            </p>

            {/* language toggle */}
            <div role="tablist" aria-label="Language" className="mt-6 inline-flex overflow-hidden rounded-md border border-[color:var(--color-plum)]/30">
              {(["home", "en", "both"] as LangView[]).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={lang === k}
                  onClick={() => setLang(k)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${lang === k ? "bg-[color:var(--color-plum)] text-[color:var(--color-chartreuse)]" : "text-[color:var(--color-plum)] hover:text-[color:var(--color-flame)]"}`}
                >
                  {k === "home" ? entry.home_language : k === "en" ? "English" : "Side-by-side"}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto src={heroPhoto.url} alt={heroPhoto.alt} className="aspect-[4/5]" rotate={-1} loading="eager" />
          </div>
        </div>
      </header>

      {/* Sections */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        {entry.video_url && (
          <div className="frame mb-16 aspect-video w-full bg-black">
            <iframe
              src={entry.video_url}
              title={`${entry.title_home} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        )}

        <NumberedSection num="1" title="The Story" color={numColors[0]}>
          <p>{entry.story}</p>
        </NumberedSection>

        {entry.type === "game" && entry.how_to_play && (
          <NumberedSection num="2" title="How to Play" color={numColors[1]}>
            <p>{entry.how_to_play}</p>
          </NumberedSection>
        )}

        <NumberedSection num={entry.type === "game" ? "3" : "2"} title="Why it Matters" color={numColors[2]}>
          <p>{entry.why_it_matters}</p>
        </NumberedSection>

        <NumberedSection num={entry.type === "game" ? "4" : "3"} title="Today" color={numColors[3]}>
          <p>{entry.today}</p>
        </NumberedSection>

        {/* Share row */}
        <div className="mt-20 rounded-md border border-[color:var(--color-plum)]/20 bg-[color:var(--color-ice)]/40 p-6">
          <p className="text-sm text-[color:var(--color-plum)]/80">
            This page is the permanent home of this entry — the QR in the book points here.
          </p>
          <button
            onClick={share}
            className="mt-4 rounded-md bg-[color:var(--color-plum)] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-plum)] hover:bg-[color:var(--color-flame)]"
          >
            Copy link
          </button>
        </div>
      </div>
    </article>
  );
}

function NumberedSection({ num, title, color, children }: { num: string; title: string; color: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-12 gap-4">
        <div className={`col-span-2 sm:col-span-1 display text-6xl sm:text-7xl leading-none ${color}`}>{num}</div>
        <div className="col-span-10 sm:col-span-11">
          <h2 className="display text-3xl sm:text-4xl text-[color:var(--color-plum)]">{title}</h2>
          <div className="mt-4 text-lg leading-relaxed text-[color:var(--color-plum)]/85">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
