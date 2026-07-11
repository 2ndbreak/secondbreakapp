import { createFileRoute } from "@tanstack/react-router";
import { FramedPhoto } from "@/components/site";
import { photos } from "@/data/entries";

export const Route = createFileRoute("/day")({
  head: () => ({
    meta: [
      { title: "2nd Break Day — 2nd Break" },
      { name: "description", content: "Twice a year, South Africa pauses for one giant playground. Schools, parks, taxi ranks, offices." },
      { property: "og:title", content: "2nd Break Day" },
      { property: "og:description", content: "No competition. No spectators. Just play." },
    ],
  }),
  component: DayPage,
});

function DayPage() {
  return (
    <>
      <section className="color-chartreuse">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/70">2nd Break Day</p>
            <h1 className="poster mt-4 text-[color:var(--color-plum)]">
              Twice a year,<br />South Africa pauses<br />
              <span className="text-[color:var(--color-flame)]">for one giant playground.</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg text-[color:var(--color-plum)]/80">
              Schools. Parks. Taxi ranks. Offices. Everyone puts down the meeting, the phone, the assignment — and picks up a game.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto src={photos.cards.url} alt="Friends gathered on the floor mid-game at night" className="aspect-[4/5]" rotate={-1.5} />
          </div>
        </div>
      </section>

      <section className="color-plum grain">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-8">
          <p className="poster text-[color:var(--color-flame)]">
            SCHOOLS.<br />
            <span className="text-[color:var(--color-chartreuse)]">PARKS.</span><br />
            TAXI RANKS.<br />
            <span className="text-[color:var(--color-chartreuse)]">OFFICES.</span>
          </p>
          <p className="display mt-12 text-3xl sm:text-5xl text-[color:var(--color-ice)]">
            No competition. No spectators.<br />
            <span className="text-[color:var(--color-chartreuse)]">Just play.</span>
          </p>
        </div>
      </section>

      <section className="color-paper">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-flame)]">Next date</p>
            <h2 className="display mt-4 text-5xl sm:text-7xl text-[color:var(--color-plum)]">
              To be<br />announced.
            </h2>
            <p className="mt-4 text-[color:var(--color-plum)]/70">Join the mailing list on the home page to hear first.</p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <form onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll reach out."); }} className="space-y-4 rounded-md border border-[color:var(--color-plum)]/25 p-6">
              <h3 className="display text-2xl text-[color:var(--color-plum)]">Host a break</h3>
              <p className="text-sm text-[color:var(--color-plum)]/70">Tell us where you'd bring 2nd Break Day. School, workplace, park, rank, block — anywhere.</p>
              <input required placeholder="Your name" className="w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]" />
              <input required type="email" placeholder="Email" className="w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]" />
              <input placeholder="Where would you host it?" className="w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]" />
              <textarea rows={3} placeholder="Tell us more (optional)" className="w-full rounded-md border border-[color:var(--color-plum)]/30 bg-transparent px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-flame)]" />
              <button type="submit" className="rounded-md bg-[color:var(--color-plum)] px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-flame)]">
                Register interest
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="color-flame">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
          <FramedPhoto src={photos.chessSuits.url} alt="Friends celebrating over a board game outdoors" className="aspect-[21/9]" />
        </div>
      </section>
    </>
  );
}
