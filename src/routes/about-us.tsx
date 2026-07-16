import { createFileRoute, Link } from "@tanstack/react-router";
import { FramedPhoto } from "@/components/site";
import { photos } from "@/data/entries";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — 2nd Break" },
      { name: "description", content: "2nd Break preserves South Africa's traditional games and folktales by bringing them back into everyday life." },
      { property: "og:title", content: "About Us — 2nd Break" },
      { property: "og:description", content: "We can't pass down what we no longer practise." },
    ],
  }),
  component: AboutUsPage,
});

const TEAM = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: "EDIT ME",
  role: "EDIT ME",
}));

function AboutUsPage() {
  return (
    <>
      <section className="color-ice">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-20 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/60">About Us</p>
            <h1 className="poster mt-4 text-[color:var(--color-plum)]">
              <span className="block whitespace-nowrap">ABOUT</span>
              <span className="block whitespace-nowrap text-[color:var(--color-flame)]">US.</span>
            </h1>
            <div className="mt-8 max-w-xl space-y-4 text-lg text-[color:var(--color-plum)]/85">
              <p>2nd Break preserves South Africa's traditional games and folktales by bringing them back into everyday life.</p>
              <p>Because we can't pass down what we no longer practise.</p>
              <p>We work with elders, families, schools and communities across the country to record games, credit the people who taught them, and put them back in circulation.</p>
              <p>The archive is free. The events are free. The knowledge belongs to the communities it comes from.</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto src={photos.clap.url} alt={photos.clap.alt} className="aspect-[4/5]" rotate={-1.5} />
          </div>
        </div>
      </section>

      <section className="color-paper">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
          <div className="flex items-end justify-between border-b border-[color:var(--color-plum)] pb-4">
            <h2 className="display text-3xl sm:text-5xl text-[color:var(--color-plum)]">The team</h2>
            <span className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/60">Placeholder cards</span>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {TEAM.map((m) => (
              <li key={m.id} className="border border-[color:var(--color-plum)]/20 p-4">
                <div className="frame aspect-[4/5] w-full bg-[color:var(--color-ice)] flex items-center justify-center text-xs uppercase tracking-widest text-[color:var(--color-plum)]/50">
                  Photo · EDIT ME
                </div>
                <p className="mt-3 display text-lg text-[color:var(--color-plum)]">{m.name}</p>
                <p className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="color-chartreuse">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-8">
          <p className="display text-2xl sm:text-3xl text-[color:var(--color-plum)]">Want the longer version?</p>
          <div className="mt-6">
            <Link to="/about" className="inline-flex rounded-md bg-[color:var(--color-plum)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-plum)] hover:bg-[color:var(--color-flame)]">
              Read the full story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}