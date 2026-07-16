import { createFileRoute, Link } from "@tanstack/react-router";
import { FramedPhoto } from "@/components/site";
import { photos } from "@/data/entries";

export const Route = createFileRoute("/schools")({
  head: () => ({
    meta: [
      { title: "For Schools — 2nd Break" },
      { name: "description", content: "Indigenous games in PE. Folktales in literacy. Learners as archivists — every year." },
      { property: "og:title", content: "For Schools — 2nd Break" },
      { property: "og:description", content: "Learners interview parents and grandparents; selected entries join the next edition." },
    ],
  }),
  component: SchoolsPage,
});

function SchoolsPage() {
  return (
    <>
      <section className="color-ice">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-plum)]/60">For Schools</p>
            <h1 className="display mt-4 text-[color:var(--color-plum)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              The curriculum<br />is already asking<br />for this.
            </h1>
            <div className="mt-8 space-y-5 text-lg text-[color:var(--color-plum)]/85">
              <p>
                Indigenous games are on the PE curriculum. Folktales power early literacy. 2nd Break gives teachers a living archive to teach from — and gives learners a way to become the archivists.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <FramedPhoto src={photos.skip.url} alt="Children playing skipping rope in the street — the classroom outside the classroom" className="aspect-[4/5]" rotate={1.5} />
          </div>
        </div>
      </section>

      <section className="color-paper">
        <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-flame)]">The programme</p>
          <h2 className="display mt-4 text-4xl sm:text-6xl text-[color:var(--color-plum)]">
            Learners as archivists —<br />every year.
          </h2>
          <div className="mt-10 grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-7 space-y-6 text-lg text-[color:var(--color-plum)]/85">
              <p>
                Once a year, participating schools run a documentation project. Learners interview a parent, grandparent, or elder about a game or folktale from their community. Every learner submits an entry.
              </p>
              <p>
                Selected entries — with contributor and community credit — join the next annual edition of the 2nd Break book, and the living digital archive.
              </p>
              <p className="display text-2xl sm:text-3xl text-[color:var(--color-plum)]">
                The child becomes the reason the elder tells the story again.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <FramedPhoto src={photos.cards.url} alt="A grandmother and granddaughter playing together — the programme, in one image" className="aspect-square" rotate={-1} />
            </div>
          </div>
        </div>
      </section>

      <section className="color-plum grain">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-24 sm:px-8">
          <div className="col-span-12 md:col-span-6">
            <h2 className="display text-4xl sm:text-6xl text-[color:var(--color-flame)]">
              Bring 2nd Break<br />to your school.
            </h2>
            <p className="mt-6 max-w-lg text-[color:var(--color-ice)]/85">
              We work with teachers on lesson plans, consent flows for the learner-elder interviews, and print copies of the annual edition for the school library.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/share" className="rounded-md bg-[color:var(--color-flame)] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-plum)] hover:bg-[color:var(--color-chartreuse)] hover:text-[color:var(--color-plum)]">
                Contribute an entry
              </Link>
              <a href="mailto:hello@2ndbreak.co.za" className="rounded-md border border-[color:var(--color-ice)]/40 px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-ice)] hover:border-[color:var(--color-chartreuse)] hover:text-[color:var(--color-chartreuse)]">
                Email us
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <FramedPhoto src={photos.clap.url} alt="Two friends playing hand-clap — culture practised, not just remembered" className="aspect-[4/5]" rotate={1} />
          </div>
        </div>
      </section>
    </>
  );
}
