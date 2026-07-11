import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

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
  const links = [
    { to: "/archive", label: "Archive" },
    { to: "/explore-games", label: "Explore Games" },
    { to: "/events", label: "Events" },
    { to: "/about", label: "The Idea" },
    { to: "/day", label: "2nd Break Day" },
    { to: "/schools", label: "Schools" },
    { to: "/share", label: "Share a game" },
  ] as const;
  const { user, loading } = useAuthSession();
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-plum)]/10 bg-[color:var(--color-paper)]/95 backdrop-blur-none">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <BrandMark size={28} color="var(--color-plum)" />
          <span className="display text-lg tracking-tight text-[color:var(--color-plum)]">2nd Break</span>
        </Link>
        <nav className="hidden flex-wrap items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wider text-[color:var(--color-plum)] transition-colors hover:text-[color:var(--color-flame)]"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-flame)] underline underline-offset-8 decoration-2" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {!loading && user ? (
            <>
              <span className="hidden lg:inline text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">
                {user.email}
              </span>
              <button
                onClick={() => supabase.auth.signOut()}
                className="rounded-md border border-[color:var(--color-plum)]/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-plum)] hover:bg-[color:var(--color-plum)] hover:text-[color:var(--color-chartreuse)]"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                search={{ mode: "login" }}
                className="rounded-md border border-[color:var(--color-plum)]/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-plum)] hover:bg-[color:var(--color-plum)] hover:text-[color:var(--color-chartreuse)]"
              >
                Log in
              </Link>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="rounded-md bg-[color:var(--color-plum)] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-flame)]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="color-plum grain mt-24">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
        <p className="poster text-[color:var(--color-flame)]">
          NO COMPETITION.
          <br />
          NO SPECTATORS.
          <br />
          <span className="text-[color:var(--color-chartreuse)]">JUST PLAY.</span>
        </p>
        <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-[color:var(--color-ice)]/20 pt-6 text-xs uppercase tracking-widest text-[color:var(--color-ice)]/70">
          <Link to="/" className="hover:text-[color:var(--color-chartreuse)]">2nd Break</Link>
          <Link to="/archive" className="hover:text-[color:var(--color-chartreuse)]">Archive</Link>
          <Link to="/explore-games" className="hover:text-[color:var(--color-chartreuse)]">Explore Games</Link>
          <Link to="/events" className="hover:text-[color:var(--color-chartreuse)]">Events</Link>
          <Link to="/about" className="hover:text-[color:var(--color-chartreuse)]">The Idea</Link>
          <Link to="/day" className="hover:text-[color:var(--color-chartreuse)]">2nd Break Day</Link>
          <Link to="/schools" className="hover:text-[color:var(--color-chartreuse)]">Schools</Link>
          <Link to="/share" className="hover:text-[color:var(--color-chartreuse)]">Share a game</Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-[color:var(--color-ice)]/70">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="hover:text-[color:var(--color-chartreuse)]">
              {s.label}
            </a>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer noopener" className="hover:text-[color:var(--color-chartreuse)]">
            WhatsApp
          </a>
          <span className="ml-auto flex items-center gap-2">
            <BrandMark size={16} color="var(--color-chartreuse)" />
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
