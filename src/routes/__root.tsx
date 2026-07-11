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
    </QueryClientProvider>
  );
}

function SiteHeader() {
  const links = [
    { to: "/archive", label: "Archive" },
    { to: "/about", label: "The Idea" },
    { to: "/day", label: "2nd Break Day" },
    { to: "/schools", label: "Schools" },
    { to: "/share", label: "Share a game" },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-plum)]/10 bg-[color:var(--color-paper)]/95 backdrop-blur-none">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <BrandMark size={28} color="var(--color-plum)" />
          <span className="display text-lg tracking-tight text-[color:var(--color-plum)]">2nd Break</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
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
        <Link
          to="/share"
          className="md:hidden rounded-md bg-[color:var(--color-plum)] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--color-chartreuse)]"
        >
          Share
        </Link>
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
        <div className="mt-16 flex flex-wrap items-center gap-8 border-t border-[color:var(--color-ice)]/20 pt-6 text-xs uppercase tracking-widest text-[color:var(--color-ice)]/70">
          <Link to="/" className="hover:text-[color:var(--color-chartreuse)]">2nd Break</Link>
          <Link to="/archive" className="hover:text-[color:var(--color-chartreuse)]">Archive</Link>
          <Link to="/about" className="hover:text-[color:var(--color-chartreuse)]">The Idea</Link>
          <Link to="/day" className="hover:text-[color:var(--color-chartreuse)]">2nd Break Day</Link>
          <Link to="/schools" className="hover:text-[color:var(--color-chartreuse)]">Schools</Link>
          <Link to="/share" className="hover:text-[color:var(--color-chartreuse)]">Share a game</Link>
          <span className="ml-auto flex items-center gap-2">
            <BrandMark size={16} color="var(--color-chartreuse)" />
            Take another break.
          </span>
        </div>
      </div>
    </footer>
  );
}
