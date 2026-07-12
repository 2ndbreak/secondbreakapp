import { createFileRoute, Link } from "@tanstack/react-router";
import { FramedPhoto } from "@/components/site";
import { photos } from "@/data/entries";

// EDIT ME — replace with your Host-a-Break Google Form embed URL
const GOOGLE_FORM_HOST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf-REPLACE_HOST/viewform?embedded=true";

type Event = {
  slug: string;
  title: string;
  date: string;
  location: string;
  city: string;
  summary: string;
  status: "upcoming" | "past";
  rsvp?: string;
};

const events: Event[] = [
  {
    slug: "2nd-break-day-spring",
    title: "2nd Break Day — Spring",
    date: "To be announced",
    location: "Nationwide",
    city: "Everywhere",
    status: "upcoming",
    summary: "The whole country pauses for one giant playground. Schools, offices, taxi ranks, parks. Bring a game, teach a game.",
    rsvp: "/day",
  },
  {
    slug: "diketo-jam-jozi",
    title: "Diketo Jam",
    date: "Saturday afternoon, next month",
    location: "Constitution Hill",
    city: "Johannesburg",
    status: "upcoming",
    summary: "Open lawn, ten stones, a hundred players. Elders lead. Kids learn. Everyone eats afterwards.",
  },
  {
    slug: "morabaraba-league",
    title: "Morabaraba League — Opening Round",
    date: "Announced quarterly",
    location: "Community halls",
    city: "Rotates",
    status: "upcoming",
    summary: "A friendly regional league. No entry fee. No trophy. Just the board and the person across from you.",
  },
  {
    slug: "storynight-cape-town",
    title: "Story Night — Elders Speak",
    date: "Earlier this year",
    location: "District Six",
    city: "Cape Town",
    status: "past",
    summary: "Three elders. Two hours. One room. Folktales in isiXhosa and English, recorded for the archive.",
  },
  {
    slug: "school-visit-limpopo",
    title: "Schools Visit — Polokwane",
    date: "Last term",
    location: "Two primary schools",
    city: "Polokwane",
    status: "past",
    summary: "Learners interviewed their grandparents. Selected entries will feature in next year's edition of the book.",
  },
];

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — 2nd Break" },
      { name: "description", content: "Upcoming and past 2nd Break events — 2nd Break Day, Diketo jams, Morabaraba leagues, story nights, school visits." },
      { property: "og:title", content: "Events — 2nd Break" },
      { property: "og:description", content: "Where and when to play with us next." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");
  return (
    <>
      <section className="color-flame">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-20 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-chartreuse)]">Events</p>
            <h1 className="poster mt-4 text-[color:var(--color-chartreuse)]">
              Where we're<br />playing next.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-[color:var(--color-chartreuse)]/90">
              2nd Break Day, Diketo jams, Morabaraba leagues, story nights, school visits. Free, community-run, always credited.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto src={photos.cards.url} alt={photos.cards.alt} className="aspect-[4/5]" rotate={-1.5} />
          </div>
        </div>
      </section>

      <section className="color-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
          <h2 className="display text-4xl sm:text-6xl text-[color:var(--color-plum)]">Upcoming</h2>
          <ul className="mt-8 divide-y divide-[color:var(--color-plum)]/20 border-y border-[color:var(--color-plum)]">
            {upcoming.map((e) => (
              <li key={e.slug} className="grid grid-cols-12 gap-6 py-8">
                <div className="col-span-12 md:col-span-3">
                  <p className="display text-2xl text-[color:var(--color-flame)]">{e.date}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">{e.city}</p>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <h3 className="display text-2xl sm:text-3xl text-[color:var(--color-plum)]">{e.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">{e.location}</p>
                  <p className="mt-3 text-[color:var(--color-plum)]/85">{e.summary}</p>
                </div>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  {e.rsvp ? (
                    <Link to={e.rsvp} className="inline-flex rounded-md bg-[color:var(--color-plum)] px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-flame)]">
                      Details
                    </Link>
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/60">Date TBC</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="color-ice">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
          <h2 className="display text-4xl sm:text-6xl text-[color:var(--color-plum)]">Past events</h2>
          <ul className="mt-8 divide-y divide-[color:var(--color-plum)]/20 border-y border-[color:var(--color-plum)]/40">
            {past.map((e) => (
              <li key={e.slug} className="grid grid-cols-12 gap-6 py-8">
                <div className="col-span-12 md:col-span-3">
                  <p className="display text-xl text-[color:var(--color-plum)]/80">{e.date}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/60">{e.city}</p>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="display text-2xl text-[color:var(--color-plum)]">{e.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/60">{e.location}</p>
                  <p className="mt-3 text-[color:var(--color-plum)]/85">{e.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="color-plum grain">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-8">
          <h2 className="display text-3xl sm:text-5xl text-[color:var(--color-chartreuse)]">Host a break in your neighbourhood.</h2>
          <p className="mt-6 text-[color:var(--color-ice)]/85">Schools, workplaces, parks, ranks, blocks — anywhere people already gather. Fill in the form and we'll help you set it up.</p>
          <div className="mt-8 overflow-hidden rounded-md bg-white">
            <iframe src={GOOGLE_FORM_HOST_URL} title="Host a break" width="100%" height="900" loading="lazy" className="block w-full">Loading form…</iframe>
          </div>
          <p className="mt-4 text-xs text-[color:var(--color-ice)]/60">Prefer the full 2nd Break Day details? <Link to="/day" className="underline">Read more here</Link>.</p>
        </div>
      </section>
    </>
  );
}