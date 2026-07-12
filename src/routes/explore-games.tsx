import { createFileRoute, Link } from "@tanstack/react-router";

type VideoGame = {
  slug: string;
  title: string;
  region: string;
  players: string;
  ages: string;
  summary: string;
  youtubeId: string;
};

// Placeholder YouTube IDs — replace with 2nd Break's own uploads.
const games: VideoGame[] = [
  {
    slug: "diketo",
    title: "Diketo",
    region: "Sesotho / Sepedi",
    players: "2–6",
    ages: "6+",
    summary: "A stones-in-a-hole game of rhythm, memory and quick hands. One person at a time picks up stones in time with a song.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "morabaraba",
    title: "Morabaraba",
    region: "Southern Africa",
    players: "2",
    ages: "8+",
    summary: "Cows on a board. A strategy game of mills and captures, played on stoeps, benches and bus stops across the region.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "kgati",
    title: "Kgati",
    region: "Nationwide",
    players: "3+",
    ages: "6+",
    summary: "Long-rope skipping with a song. Two turn the rope, everyone else jumps in, one at a time, without missing a beat.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "amagenda",
    title: "Amagenda",
    region: "isiZulu / isiXhosa",
    players: "2+",
    ages: "6+",
    summary: "A ball, a wall, and a tally. A rhythm game where every miss resets the count and every catch adds to the story.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "black-mampatile",
    title: "Black Mampatile",
    region: "Nationwide",
    players: "6+",
    ages: "6+",
    summary: "Hide-and-seek at dusk with a chant to open the round. The seeker counts; the block turns into a maze.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "three-tin",
    title: "Three Tin",
    region: "Nationwide",
    players: "4+",
    ages: "7+",
    summary: "Stack three tins. Throw the ball. Rebuild before the other team hits you out. A neighborhood classic.",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export const Route = createFileRoute("/explore-games")({
  head: () => ({
    meta: [
      { title: "Explore Games — 2nd Break" },
      { name: "description", content: "Watch how South African traditional games are played. A growing video gallery of Diketo, Morabaraba, Kgati and more." },
      { property: "og:title", content: "Explore Games — 2nd Break" },
      { property: "og:description", content: "Watch, learn, play. A video gallery of traditional games." },
    ],
  }),
  component: ExploreGamesPage,
});

function ExploreGamesPage() {
  return (
    <>
      <section className="color-chartreuse">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/70">Explore Games</p>
          <h1 className="poster mt-4 text-[color:var(--color-plum)] ">
            Watch. Learn.<br />
            <span className="text-[color:var(--color-flame)]">Then go play.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[color:var(--color-plum)]/80">
            A growing video gallery. Every game is filmed with the people who taught it to us — in the languages it was taught in.
          </p>
        </div>
      </section>

      <section className="color-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
            {games.map((g) => (
              <article key={g.slug} className="flex flex-col">
                <div className="frame aspect-video w-full overflow-hidden">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${g.youtubeId}`}
                    title={g.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-5">
                  <h2 className="display text-3xl text-[color:var(--color-plum)]">{g.title}</h2>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[color:var(--color-flame)]">
                    {g.region} · {g.players} players · Ages {g.ages}
                  </p>
                  <p className="mt-4 text-[color:var(--color-plum)]/85">{g.summary}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-16 border-t border-[color:var(--color-plum)]/20 pt-8">
            <p className="text-[color:var(--color-plum)]/80">
              Know a game we haven't filmed?{" "}
              <Link to="/share" className="text-[color:var(--color-flame)] underline underline-offset-4">Share it with us →</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}