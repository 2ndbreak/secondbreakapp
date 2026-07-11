import { createFileRoute, Link } from "@tanstack/react-router";
import { photos, entries } from "@/data/entries";
import { EntryCard, FramedPhoto, QuoteCard } from "@/components/site";
import { BrandMark } from "@/components/BrandMark";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const gameOfWeek = entries.find((e) => e.slug === "morabaraba")!;
  const storySunday = entries.find((e) => e.type === "folktale")!;
  return (
    <>
      {/* HERO — plum poster with bleeding type + overlapping photo */}
      <section className="color-plum grain relative overflow-hidden">
        <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-6 px-4 pb-40 pt-16 sm:px-8 sm:pt-24 md:pb-56">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3 text-[color:var(--color-chartreuse)]">
              <BrandMark size={22} color="var(--color-chartreuse)" />
              <span className="text-xs uppercase tracking-[0.25em]">Take Another Break</span>
            </div>
            <h1 className="poster mt-6 text-[color:var(--color-flame)]">
              REMEMBER
              <br />
              <span className="text-[color:var(--color-chartreuse)]">HOW TO</span>
              <br />
              <span className="-ml-[2vw] block">PLAY?</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-[color:var(--color-ice)]/90">
              Rediscover indigenous games, stories & childhood wonder — every break has a story.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/archive"
                className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-flame)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] transition-colors hover:bg-[color:var(--color-chartreuse)] hover:text-[color:var(--color-plum)]"
              >
                Explore the archive
              </Link>
              <Link
                to="/share"
                className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-ice)]/50 px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-ice)] transition-colors hover:border-[color:var(--color-chartreuse)] hover:text-[color:var(--color-chartreuse)]"
              >
                Share a game
              </Link>
            </div>
          </div>
        </div>
        {/* overlapping photo — bleeds off hero bottom edge */}
        <div className="pointer-events-none absolute right-2 sm:right-8 -bottom-16 w-[52vw] max-w-[520px] md:w-[38vw]">
          <FramedPhoto
            src={photos.skip.url}
            alt={photos.skip.alt}
            className="aspect-[4/5] shadow-2xl"
            rotate={1}
            loading="eager"
            width={900}
            height={1125}
          />
        </div>
      </section>

      {/* PROBLEM BLOCK — Ice Blue */}
      <section className="color-ice">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/60">The problem</p>
            <h2 className="display mt-4 text-4xl sm:text-6xl leading-[0.95] text-[color:var(--color-plum)]">
              Remember Mugusha?
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[color:var(--color-plum)]/85">
              <p>
                Somebody starts humming the song. Everybody laughs. Somebody else names another game — Diketo, Kgati, Amagenda, Morabaraba — and the room lights up.
              </p>
              <p>
                Then somebody asks, "But wait — how did it go again?"
              </p>
              <p className="display text-2xl sm:text-3xl text-[color:var(--color-plum)]">
                They remember the memories. They've forgotten the game.
              </p>
              <p>
                Culture isn't lost because people stop caring. It's lost because people stop practising. You can't pass down what you don't play.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-16">
            <QuoteCard
              src={photos.clap.url}
              alt={photos.clap.alt}
              quote="Culture isn't lost because people stop caring. It's lost because people stop practising."
              tone="chartreuse"
              rotate={-1}
            />
          </div>
        </div>
      </section>

      {/* GAME OF THE WEEK + STORY SUNDAY BANDS */}
      <section className="color-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-6">
              <div className="flex items-baseline justify-between border-b border-[color:var(--color-plum)]/25 pb-3">
                <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-flame)]">Game of the Week</span>
                <span className="text-xs text-[color:var(--color-plum)]/60">{gameOfWeek.edition}</span>
              </div>
              <Link to="/entry/$slug" params={{ slug: gameOfWeek.slug }} className="mt-6 block group no-underline">
                <div className="frame aspect-[4/3] w-full overflow-hidden">
                  <img src={photos.chessTaxi.url} alt={photos.chessTaxi.alt} loading="lazy" className="h-full w-full object-cover transition-[filter] duration-300 group-hover:brightness-95" />
                </div>
                <h3 className="display mt-5 text-3xl sm:text-4xl text-[color:var(--color-plum)] group-hover:text-[color:var(--color-flame)] transition-colors">
                  {gameOfWeek.title_home}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--color-plum)]/70">{gameOfWeek.title_en} · {gameOfWeek.home_language} · {gameOfWeek.province}</p>
              </Link>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex items-baseline justify-between border-b border-[color:var(--color-plum)]/25 pb-3">
                <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-flame)]">Story Sunday</span>
                <span className="text-xs text-[color:var(--color-plum)]/60">The stories live with our elders</span>
              </div>
              <Link to="/entry/$slug" params={{ slug: storySunday.slug }} className="mt-6 block group no-underline">
                <div className="frame aspect-[4/3] w-full overflow-hidden">
                  <img src={photos.chessTaxi.url} alt="An elder deep in memory at the taxi rank" loading="lazy" className="h-full w-full object-cover transition-[filter] duration-300 group-hover:brightness-95" />
                </div>
                <h3 className="display mt-5 text-3xl sm:text-4xl text-[color:var(--color-plum)] group-hover:text-[color:var(--color-flame)] transition-colors">
                  {storySunday.title_home}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--color-plum)]/70">{storySunday.title_en} · {storySunday.home_language} · {storySunday.province}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST ENTRIES STRIP */}
      <section className="color-paper">
        <div className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8">
          <div className="flex items-end justify-between border-b border-[color:var(--color-plum)] pb-4">
            <h2 className="display text-3xl sm:text-5xl text-[color:var(--color-plum)]">Latest entries</h2>
            <Link to="/archive" className="text-xs uppercase tracking-widest text-[color:var(--color-flame)] hover:underline underline-offset-4">
              See the whole archive →
            </Link>
          </div>
          <div>
            {entries.map((e, i) => (
              <EntryCard key={e.slug} entry={e} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 2ND BREAK DAY TEASER — Chartreuse */}
      <section className="color-chartreuse">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/70">2nd Break Day</p>
            <h2 className="display mt-4 text-4xl sm:text-7xl leading-[0.9] text-[color:var(--color-plum)]">
              Twice a year,<br />South Africa pauses<br />
              <span className="text-[color:var(--color-flame)]">for one giant playground.</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/day"
                className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-plum)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-flame)]"
              >
                Learn more
              </Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto
              src={photos.cards.url}
              alt="Friends gathered on the floor mid-game"
              className="aspect-[4/5]"
              rotate={-1.5}
            />
          </div>
        </div>
      </section>

      {/* QUOTE-CARD TRIO */}
      <section className="color-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <QuoteCard
                src={photos.chessTaxi.url}
                alt="An elder mid-story, looking down at the game"
                quote="Some knowledge is passed down. Other knowledge is passed around."
                tone="chartreuse"
              />
            </div>
            <div className="col-span-12 md:col-span-4 md:pt-12">
              <QuoteCard
                src={photos.clap.url}
                alt="Two friends playing hand-clap, faces close"
                quote="Every game carries the memory of someone who came before us."
                tone="ice"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <QuoteCard
                src={photos.cards.url}
                alt="Friends gathered on the floor mid-game"
                quote="Maybe adulthood just needs a Second Break."
                tone="flame"
              />
            </div>
          </div>
        </div>
      </section>

      {/* JOIN THE PLAYGROUND */}
      <section className="color-flame">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-chartreuse)]">Join the playground</p>
            <h2 className="display mt-4 text-4xl sm:text-6xl leading-[0.95] text-[color:var(--color-chartreuse)]">
              A new game, a new story, in your inbox every fortnight.
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks — we'll be in touch.");
              }}
              className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@somewhere.co.za"
                className="w-full rounded-md border border-[color:var(--color-chartreuse)]/60 bg-transparent px-4 py-3 text-[color:var(--color-chartreuse)] placeholder:text-[color:var(--color-chartreuse)]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-chartreuse)]"
              />
              <button
                type="submit"
                className="rounded-md bg-[color:var(--color-plum)] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-chartreuse)] hover:text-[color:var(--color-plum)]"
              >
                Join
              </button>
            </form>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto
              src={photos.chessSuits.url}
              alt="Two men in suits over a chessboard, mid-game"
              className="aspect-[4/5]"
              rotate={1.5}
            />
          </div>
        </div>
      </section>
    </>
  );
}
