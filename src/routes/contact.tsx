import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/forms/ContactForm";

// EDIT ME
const CONTACT_EMAIL = "hello@2ndbreak.co.za";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "YouTube", href: "https://youtube.com/" },
  { label: "TikTok", href: "https://tiktok.com/" },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — 2nd Break" },
      { name: "description", content: "Talk to 2nd Break — email, WhatsApp, socials, or send us a message." },
      { property: "og:title", content: "Talk to us — 2nd Break" },
      { property: "og:description", content: "Get in touch with the 2nd Break team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="color-flame">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-chartreuse)]">Contact</p>
          <h1 className="poster mt-4 text-[color:var(--color-chartreuse)]">
            <span className="block whitespace-nowrap">TALK</span>
            <span className="block whitespace-nowrap">TO US.</span>
          </h1>
        </div>
      </section>

      <section className="color-paper">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-4 py-20 sm:px-8">
          <div className="col-span-12 md:col-span-5">
            <div className="space-y-6 text-[color:var(--color-plum)]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/60">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="display mt-2 block text-2xl sm:text-3xl text-[color:var(--color-flame)] hover:underline">
                  {CONTACT_EMAIL}
                </a>
                <p className="mt-1 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/50">EDIT ME</p>
              </div>
              <div className="border-t border-[color:var(--color-plum)]/20 pt-6">
                <p className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/60">WhatsApp</p>
                <p className="mt-2 text-[color:var(--color-plum)]/85">
                  Or tap the WhatsApp button, bottom right of any page.
                </p>
              </div>
              <div className="border-t border-[color:var(--color-plum)]/20 pt-6">
                <p className="text-xs uppercase tracking-widest text-[color:var(--color-plum)]/60">Social</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs uppercase tracking-widest">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="text-[color:var(--color-plum)] hover:text-[color:var(--color-flame)]">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <h2 className="display text-2xl text-[color:var(--color-plum)]">Send a message</h2>
            <div className="mt-4 overflow-hidden rounded-md border border-[color:var(--color-plum)]/25 bg-white">
              <iframe
                src={GOOGLE_FORM_CONTACT_URL}
                title="Contact 2nd Break"
                width="100%"
                height="1100"
                loading="lazy"
                className="block w-full"
              >
                Loading form…
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}