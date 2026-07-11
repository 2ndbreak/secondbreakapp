import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo } from "react";
import { entries, photos } from "@/data/entries";
import { EntryCard } from "@/components/site";

const archiveSearchSchema = z.object({
  type: z.enum(["all", "game", "folktale"]).optional().default("all"),
  province: z.string().optional().default("all"),
  language: z.string().optional().default("all"),
  edition: z.string().optional().default("all"),
  q: z.string().optional().default(""),
});

export const Route = createFileRoute("/archive")({
  validateSearch: (search) => archiveSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "The Archive — 2nd Break" },
      {
        name: "description",
        content:
          "Every game and folktale in the 2nd Break archive — filter by province, language, edition or type.",
      },
      { property: "og:title", content: "The Archive — 2nd Break" },
      {
        property: "og:description",
        content: "A living archive of South African traditional games and folktales.",
      },
    ],
  }),
  component: ArchivePage,
});

function ArchivePage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/archive" });

  const provinces = useMemo(() => Array.from(new Set(entries.map((e) => e.province))), []);
  const languages = useMemo(() => Array.from(new Set(entries.map((e) => e.home_language))), []);
  const editions = useMemo(() => Array.from(new Set(entries.map((e) => e.edition))), []);

  const filtered = entries.filter((e) => {
    if (search.type !== "all" && e.type !== search.type) return false;
    if (search.province !== "all" && e.province !== search.province) return false;
    if (search.language !== "all" && e.home_language !== search.language) return false;
    if (search.edition !== "all" && e.edition !== search.edition) return false;
    if (search.q) {
      const q = search.q.toLowerCase();
      const hay = `${e.title_home} ${e.title_en} ${e.community_credit} ${e.province} ${e.home_language}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const setSearch = (partial: Partial<typeof search>) => {
    navigate({ search: { ...search, ...partial }, replace: true });
  };

  return (
    <section className="color-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-flame)]">The Archive</p>
            <h1 className="display mt-4 text-5xl sm:text-8xl leading-[0.9] text-[color:var(--color-plum)]">
              Games & folktales,
              <br />
              in one open index.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[color:var(--color-plum)]/80">
              Every entry lives at a permanent public URL. Nothing behind a login, ever.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="flex gap-3">
              {[photos.clap, photos.cards, photos.chessSuits].map((p, i) => (
                <div key={i} className="frame aspect-square flex-1">
                  <img src={p.url} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* filters */}
        <div className="mt-14 grid grid-cols-2 gap-3 border-t border-b border-[color:var(--color-plum)] py-4 sm:grid-cols-5">
          <FilterSelect label="Type" value={search.type} onChange={(v) => setSearch({ type: v as any })}
            options={[{ v: "all", l: "All" }, { v: "game", l: "Games" }, { v: "folktale", l: "Folktales" }]} />
          <FilterSelect label="Province" value={search.province} onChange={(v) => setSearch({ province: v })}
            options={[{ v: "all", l: "All" }, ...provinces.map((p) => ({ v: p, l: p }))]} />
          <FilterSelect label="Language" value={search.language} onChange={(v) => setSearch({ language: v })}
            options={[{ v: "all", l: "All" }, ...languages.map((p) => ({ v: p, l: p }))]} />
          <FilterSelect label="Edition" value={search.edition} onChange={(v) => setSearch({ edition: v })}
            options={[{ v: "all", l: "All" }, ...editions.map((p) => ({ v: p, l: p }))]} />
          <label className="flex flex-col text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">
            <span className="mb-1">Search</span>
            <input
              type="search"
              value={search.q}
              onChange={(e) => setSearch({ q: e.target.value })}
              placeholder="diketo, morabaraba…"
              className="rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 text-sm normal-case text-[color:var(--color-plum)] placeholder:text-[color:var(--color-plum)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]"
            />
          </label>
        </div>

        <div className="mt-4 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        </div>

        <div className="mt-4">
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-[color:var(--color-plum)]/60">Nothing matches. Try clearing a filter.</div>
          ) : (
            filtered.map((e, i) => <EntryCard key={e.slug} entry={e} index={i} />)
          )}
        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <label className="flex flex-col text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">
      <span className="mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 text-sm normal-case text-[color:var(--color-plum)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}
