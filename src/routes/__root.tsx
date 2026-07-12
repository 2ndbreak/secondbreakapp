import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BrandMark } from "@/components/BrandMark";
import { useAuthSession } from "@/hooks/useAuthSession";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_LINK = "https://wa.me/27000000000";
const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "YouTube", href: "https://youtube.com/" },
  { label: "TikTok", href: "https://tiktok.com/" },
];
// EDIT ME
const CONTACT_EMAIL = "hello@2ndbreak.co.za";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center color-plum grain px-6">
      <div className="max-w-xl text-center">
        <div className="poster text-[color:var(--color-flame)]">404</div>
        <p className="mt-6 text-[color:var(--color-ice)]/80">
          This page has wandered off to play. Head back to the archive.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-flame)] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-chartreuse)]"
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center color-plum grain px-6">
      <div className="max-w-xl text-center">
        <div className="poster text-[color:var(--color-flame)]">OOPS</div>
        <p className="mt-6 text-[color:var(--color-ice)]/80">Something broke mid-play. Try again.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-[color:var(--color-flame)] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-chartreuse)]"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-md border border-[color:var(--color-ice)]/40 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-ice)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "2nd Break — Take Another Break" },
      {
        name: "description",
        content:
          "A living archive of South African traditional games and folktales. Rediscover indigenous games, stories & childhood wonder — every break has a story.",
      },
      { name: "author", content: "2nd Break" },
      { property: "og:title", content: "2nd Break — Take Another Break" },
      {
        property: "og:description",
        content:
          "You inherit nostalgia instead of knowledge. 2nd Break brings South African games and folktales back into everyday life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,900&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </QueryClientProvider>
  );
}

function SiteHeader() {
  const { user, loading } = useAuthSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const linkCls =
    "text-sm font-semibold uppercase tracking-wider text-[color:var(--color-plum)] hover:text-[color:var(--color-flame)] transition-colors";
  const activeLinkCls = "text-[color:var(--color-flame)]";

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-plum)]/15 bg-[color:var(--color-paper)]/95 backdrop-blur-none">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3 no-underline shrink-0" onClick={closeMobile}>
          <BrandMark size={28} color="var(--color-plum)" />
          <span className="display text-lg tracking-tight text-[color:var(--color-plum)]">2nd Break</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/archive" className={linkCls} activeProps={{ className: `${linkCls} ${activeLinkCls}` }}>Archive</Link>
          <Link to="/explore-games" className={linkCls} activeProps={{ className: `${linkCls} ${activeLinkCls}` }}>Explore Games</Link>

          <HeaderDropdown label="Events">
            <DropdownLink to="/events">Upcoming & Past Events</DropdownLink>
            <DropdownLink to="/day">2nd Break Day</DropdownLink>
          </HeaderDropdown>

          <HeaderDropdown label="About">
            <DropdownLink to="/about-us">About Us</DropdownLink>
            <DropdownLink to="/about">The Idea</DropdownLink>
            <DropdownLink to="/schools">For Schools</DropdownLink>
            <DropdownLink to="/contact">Contact</DropdownLink>
          </HeaderDropdown>
        </nav>

        {/* Right cluster (desktop) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link
            to="/share"
            className="rounded-md bg-[color:var(--color-flame)] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-plum)]"
          >
            Share a game
          </Link>
          {!loading && user ? (
            <button
              onClick={() => supabase.auth.signOut()}
              className="rounded-md border border-[color:var(--color-plum)]/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-plum)] hover:bg-[color:var(--color-plum)] hover:text-[color:var(--color-chartreuse)]"
            >
              Log out
            </button>
          ) : (
            <>
              <Link to="/auth" search={{ mode: "login" }} className="rounded-md border border-[color:var(--color-plum)]/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-plum)] hover:bg-[color:var(--color-plum)] hover:text-[color:var(--color-chartreuse)]">Log in</Link>
              <Link to="/auth" search={{ mode: "signup" }} className="rounded-md bg-[color:var(--color-plum)] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-flame)]">Sign up</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden inline-flex items-center justify-center rounded-md border border-[color:var(--color-plum)]/30 p-2 text-[color:var(--color-plum)]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[color:var(--color-plum)]/15 bg-[color:var(--color-paper)]">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-4 sm:px-8">
            <MobileLink to="/archive" onClick={closeMobile}>Archive</MobileLink>
            <MobileLink to="/explore-games" onClick={closeMobile}>Explore Games</MobileLink>
            <MobileGroup label="Events">
              <MobileLink to="/events" onClick={closeMobile} sub>Upcoming & Past Events</MobileLink>
              <MobileLink to="/day" onClick={closeMobile} sub>2nd Break Day</MobileLink>
            </MobileGroup>
            <MobileGroup label="About">
              <MobileLink to="/about-us" onClick={closeMobile} sub>About Us</MobileLink>
              <MobileLink to="/about" onClick={closeMobile} sub>The Idea</MobileLink>
              <MobileLink to="/schools" onClick={closeMobile} sub>For Schools</MobileLink>
              <MobileLink to="/contact" onClick={closeMobile} sub>Contact</MobileLink>
            </MobileGroup>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[color:var(--color-plum)]/15 pt-4">
              <Link to="/share" onClick={closeMobile} className="rounded-md bg-[color:var(--color-flame)] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-chartreuse)]">Share a game</Link>
              {!loading && user ? (
                <button onClick={() => { supabase.auth.signOut(); closeMobile(); }} className="rounded-md border border-[color:var(--color-plum)]/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-plum)]">Log out</button>
              ) : (
                <>
                  <Link to="/auth" search={{ mode: "login" }} onClick={closeMobile} className="rounded-md border border-[color:var(--color-plum)]/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-plum)]">Log in</Link>
                  <Link to="/auth" search={{ mode: "signup" }} onClick={closeMobile} className="rounded-md bg-[color:var(--color-plum)] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-chartreuse)]">Sign up</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function HeaderDropdown({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-plum)] hover:text-[color:var(--color-flame)]"
        aria-expanded={open}
      >
        {label}
        <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2 4l4 4 4-4z"/></svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full min-w-[220px] border border-[color:var(--color-plum)]/20 bg-[color:var(--color-paper)] py-2 shadow-md rounded-md">
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to as never}
      className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-plum)] hover:bg-[color:var(--color-chartreuse)]"
      activeProps={{ className: "block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-flame)] bg-[color:var(--color-chartreuse)]/50" }}
    >
      {children}
    </Link>
  );
}

function MobileGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="py-1">
      <div className="px-2 pt-3 pb-1 text-[10px] uppercase tracking-widest text-[color:var(--color-plum)]/60">{label}</div>
      {children}
    </div>
  );
}

function MobileLink({ to, onClick, sub, children }: { to: string; onClick: () => void; sub?: boolean; children: ReactNode }) {
  return (
    <Link
      to={to as never}
      onClick={onClick}
      className={`block ${sub ? "pl-4" : ""} py-2 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-plum)] hover:text-[color:var(--color-flame)]`}
      activeProps={{ className: `block ${sub ? "pl-4" : ""} py-2 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-flame)]` }}
    >
      {children}
    </Link>
  );
}

function SiteFooter() {
  return (
    <footer className="color-plum grain mt-24">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
        <p className="poster-sm text-[color:var(--color-flame)]">
          NO COMPETITION.
          <br />
          NO SPECTATORS.
          <br />
          <span className="text-[color:var(--color-chartreuse)]">JUST PLAY.</span>
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-[color:var(--color-ice)]/20 pt-6 text-xs uppercase tracking-widest text-[color:var(--color-ice)]/70">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="hover:text-[color:var(--color-chartreuse)]">
              {s.label}
            </a>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer noopener" className="hover:text-[color:var(--color-chartreuse)]">
            WhatsApp
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-widest text-[color:var(--color-ice)]/60">
          <span>© {new Date().getFullYear()} 2nd Break</span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[color:var(--color-chartreuse)]">{CONTACT_EMAIL} <span className="opacity-60">(EDIT ME)</span></a>
          <span className="ml-auto flex items-center gap-2 text-[color:var(--color-chartreuse)]">
            <BrandMark size={14} color="var(--color-chartreuse)" />
            Take another break.
          </span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[color:var(--color-flame)] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] shadow-lg hover:bg-[color:var(--color-chartreuse)] hover:text-[color:var(--color-plum)]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.9 11.9 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.64 6L0 24l6.2-1.62A11.9 11.9 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52ZM12 22a10 10 0 0 1-5.1-1.4l-.36-.22-3.68.97.98-3.58-.24-.37A10 10 0 1 1 22 12c0 5.52-4.48 10-10 10Zm5.47-7.5c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.5a9.2 9.2 0 0 1-1.7-2.12c-.18-.3-.02-.47.13-.62.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.63-.93-2.24-.24-.58-.5-.5-.68-.5H8.7c-.2 0-.53.07-.8.38-.28.3-1.06 1.04-1.06 2.54s1.09 2.94 1.24 3.14c.15.2 2.14 3.27 5.18 4.58.72.3 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
      WhatsApp
    </a>
  );
}
