import { createFileRoute, Link } from "@tanstack/react-router";
import { photos, entries } from "@/data/entries";
import { EntryCard, FramedPhoto, QuoteCard } from "@/components/site";
import { BrandMark } from "@/components/BrandMark";
import { PlaygroundSignupForm } from "@/components/forms/PlaygroundSignupForm";
import problemBlockImg from "@/assets/problem-block.png.asset.json";
import groupPlayImg from "@/assets/group-play.png.asset.json";
import brandIdentityGif from "@/assets/brand-identity.gif.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const gameOfWeek = entries.find((e) => e.slug === "morabaraba")!;
  const gameEntries = entries.filter((e) => e.type === "game");
  return (
    <>
      {/* HERO — ice poster. */}
      <section className="color-ice grain">
        <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-8 sm:py-24">
          <div className="flex items-center gap-3">
            <BrandMark size={26} color="#000000" />
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-flame)]">BREAK TIME! A RE DLALENG</span>
          </div>
          <div className="mt-6 grid grid-cols-12 gap-x-8 gap-y-10">
            <div className="col-span-12 md:col-span-7">
              <h1 className="poster">
                <span className="block whitespace-nowrap text-[color:var(--color-flame)]">REMEMBER</span>
                <span className="block whitespace-nowrap text-[color:var(--color-plum)]">HOW TO</span>
                <span className="block whitespace-nowrap text-[color:var(--color-flame)]">PLAY?</span>
              </h1>
              <p className="mt-10 max-w-lg text-lg leading-relaxed text-[color:var(--color-plum)]/85 whitespace-pre-line">
                Come get that childhood energy back.&nbsp;&nbsp;{"\n"}
                The games. The stories. The "wena wena" vibes.&nbsp;&nbsp;{"\n"}
                Every break was a movie.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/archive"
                  className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-plum)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-flame)] transition-colors hover:bg-[color:var(--color-flame)] hover:text-[color:var(--color-plum)]"
                >
                  Explore the archive
                </Link>
                <Link
                  to="/explore-games"
                  className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-plum)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-flame)] transition-colors hover:bg-[color:var(--color-flame)] hover:text-[color:var(--color-plum)]"
                >
                  BONA DI GAMES (VIDEOS)
                </Link>
                <Link
                  to="/share"
                  className="inline-flex items-center gap-2 rounded-md border border-[color:var(--color-plum)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-plum)] transition-colors hover:bg-[color:var(--color-plum)] hover:text-[color:var(--color-flame)]"
                >
                  Share a game
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 md:mt-[calc(9vw*0.9+38px)] lg:mt-[calc(7vw*0.9+38px)] hero-float">
              <FramedPhoto
                src={photos.heroJumpRope.url}
                alt={photos.heroJumpRope.alt}
                className="aspect-[4/5]"
                rotate={1}
                loading="eager"
                width={900}
                height={1125}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM BLOCK — Flame (orange, was brown) */}
      <section className="color-flame grain">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/70">The problem</p>
            <h2 className="display mt-4 text-4xl sm:text-6xl leading-[0.95] text-[color:var(--color-plum)]">
              Remember Mugusha?
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[color:var(--color-plum)]/90">
              <p>
                Somebody hums a song. Somebody names a game — Diketo, Kgati, Amagenda, Morabaraba. The room lights up. Then somebody asks how it went again, and nobody can quite remember.
              </p>
              <p className="display text-2xl sm:text-3xl text-[color:var(--color-plum)]">
                They remember the memories. They've forgotten the game.
              </p>
              <Link to="/about" className="inline-block text-xs uppercase tracking-widest text-[color:var(--color-plum)] hover:underline underline-offset-4">
                Read the full idea →
              </Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-16">
            <QuoteCard
              src={problemBlockImg.url}
              alt="2nd Break — one more chance to play"
              quote="Culture isn't lost because people stop caring. It's lost because people stop practising."
              tone="chartreuse"
              rotate={-1}
            />
          </div>
        </div>
      </section>

      {/* GAME OF THE WEEK */}
      <section className="color-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8">
          <div className="flex items-baseline justify-between border-b border-[color:var(--color-plum)]/25 pb-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-flame)]">Game of the Week</span>
            <span className="text-xs text-[color:var(--color-plum)]/60">{gameOfWeek.edition}</span>
          </div>
          <Link to="/entry/$slug" params={{ slug: gameOfWeek.slug }} className="mt-6 grid grid-cols-12 gap-8 group no-underline">
            <div className="col-span-12 md:col-span-7">
              <div className="frame aspect-[4/3] w-full overflow-hidden">
                <img src={photos.chessTaxi.url} alt={photos.chessTaxi.alt} loading="lazy" className="h-full w-full object-cover transition-[filter] duration-300 group-hover:brightness-95" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
              <h3 className="display text-4xl sm:text-6xl text-[color:var(--color-plum)] group-hover:text-[color:var(--color-flame)] transition-colors">
                {gameOfWeek.title_home}
              </h3>
              <p className="mt-2 text-sm text-[color:var(--color-plum)]/70">{gameOfWeek.title_en} · {gameOfWeek.home_language} · {gameOfWeek.province}</p>
            </div>
          </Link>
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
            {gameEntries.map((e, i) => (
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
                className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-plum)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-flame)] hover:bg-[color:var(--color-flame)] hover:text-[color:var(--color-plum)]"
              >
                Learn more
              </Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto
              src={photos.diketoTop.url}
              alt={photos.diketoTop.alt}
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
                src={photos.diketoYard.url}
                alt={photos.diketoYard.alt}
                quote="Some knowledge is passed down. Other knowledge is passed around."
                tone="chartreuse"
              />
            </div>
            <div className="col-span-12 md:col-span-4 md:pt-12">
              <QuoteCard
                src={photos.jumpRope.url}
                alt={photos.jumpRope.alt}
                quote="Every game carries the memory of someone who came before us."
                tone="ice"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <QuoteCard
                src={groupPlayImg.url}
                alt="Group of friends smiling together"
                quote="Maybe adulthood just needs a Second Break."
                tone="flame"
              />
            </div>
          </div>
        </div>
      </section>

      {/* JOIN THE PLAYGROUND */}
      <section className="color-flame">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8 items-center">
          <div className="col-span-12 md:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]">Join the playground</p>
            <h2 className="display mt-4 text-3xl sm:text-5xl leading-[1.05] text-[color:var(--color-plum)]">
              A new game in your inbox every fortnight.
            </h2>
            <div className="mt-8 max-w-lg">
              <PlaygroundSignupForm />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="frame w-full overflow-hidden bg-[color:var(--color-plum)]">
              <img
                src={brandIdentityGif.url}
                alt="2nd Break brand identity in motion"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
