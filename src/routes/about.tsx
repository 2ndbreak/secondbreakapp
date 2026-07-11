import { createFileRoute, Link } from "@tanstack/react-router";
import { FramedPhoto } from "@/components/site";
import { photos } from "@/data/entries";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Idea — 2nd Break" },
      { name: "description", content: "Why 2nd Break exists — and how a living archive of games and folktales works." },
      { property: "og:title", content: "The Idea — 2nd Break" },
      { property: "og:description", content: "You inherit nostalgia instead of knowledge. Here is what we're doing about it." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="color-ice">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/60">The Idea</p>
            <h1 className="poster mt-4 text-[color:var(--color-plum)]">
              We inherit nostalgia<br />instead of knowledge.
            </h1>
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-[color:var(--color-plum)]/85">
              <p>
                Somebody starts humming the song. Everybody laughs. Somebody names a game — Diketo, Amagenda, Morabaraba — and the room lights up. Then somebody asks how it went again, and nobody can quite remember.
              </p>
              <p>
                Culture isn't lost because people stop caring. It's lost because people stop practising. You can't pass down what you don't play.
              </p>
              <p className="display text-2xl sm:text-3xl text-[color:var(--color-plum)]">
                2nd Break is a living archive and a movement. Take another break.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-16">
            <FramedPhoto src={photos.cards.url} alt="Friends gathered on the floor mid-game — nostalgic, hopeful, playful" className="aspect-[4/5]" rotate={-1.5} />
            <p className="mt-4 display text-2xl text-[color:var(--color-plum)]">Nostalgic. Hopeful. Playful.</p>
          </div>
        </div>
      </section>

      <section className="color-paper">
        <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-8">
          <h2 className="display text-4xl sm:text-6xl text-[color:var(--color-plum)]">How it works</h2>
          <ol className="mt-10 divide-y divide-[color:var(--color-plum)]/20 border-y border-[color:var(--color-plum)]">
            {[
              ["Find", "Find a game or a story — in the archive, in the book, in a chat with an elder."],
              ["Scan", "Scan the QR, or search the slug. Every entry has a permanent public URL."],
              ["Learn", "Read the story, the rules, and why it matters — in the home language, in English, or both."],
              ["Play", "Play it. On the stoep, at lunch, in the taxi rank, in the classroom."],
              ["Pass it on", "Teach one person. Share the link. Bring it to 2nd Break Day."],
            ].map(([k, v], i) => (
              <li key={k} className="flex items-baseline gap-6 py-6">
                <div className="display text-4xl sm:text-5xl w-16 text-[color:var(--color-flame)]">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="display text-2xl sm:text-3xl text-[color:var(--color-plum)]">{k}</div>
                  <p className="mt-2 text-[color:var(--color-plum)]/80">{v}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="color-plum grain">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-chartreuse)]">Sustainability</p>
            <h2 className="display mt-4 text-4xl sm:text-6xl text-[color:var(--color-flame)]">
              A book. An archive.<br />A day. A classroom.
            </h2>
            <ul className="mt-8 space-y-4 text-[color:var(--color-ice)]/90">
              <li>Annual editions — a printed book each year with fresh entries.</li>
              <li>Community contributions — everything is credited to the community it comes from.</li>
              <li>School partnerships — learners interview their elders; selected entries join the next edition.</li>
              <li>A living digital archive — every entry stays public forever at a permanent URL.</li>
            </ul>
            <div className="mt-10">
              <Link to="/share" className="inline-flex rounded-md bg-[color:var(--color-flame)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-chartreuse)] hover:text-[color:var(--color-plum)]">
                Share a game or story
              </Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <FramedPhoto src={photos.chessSuits.url} alt="An elder laughing over a board game — the archive comes from people, not databases" className="aspect-[4/5]" rotate={1.5} />
          </div>
        </div>
      </section>
    </>
  );
}
