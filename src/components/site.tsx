import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { photos, fallbackPhoto, type Entry } from "@/data/entries";

interface FramedPhotoProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  rotate?: number;
}

export function FramedPhoto({ src, alt, className, loading = "lazy", width = 1200, height = 900, rotate }: FramedPhotoProps) {
  return (
    <div
      className={`frame relative isolate bg-[color:var(--color-plum)]/5 ${className ?? ""}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

interface QuoteCardProps {
  src: string;
  alt: string;
  quote: string;
  tone?: "chartreuse" | "ice" | "flame";
  rotate?: number;
}

export function QuoteCard({ src, alt, quote, tone = "chartreuse", rotate }: QuoteCardProps) {
  const bg =
    tone === "chartreuse"
      ? "bg-[color:var(--color-chartreuse)] text-[color:var(--color-plum)]"
      : tone === "ice"
      ? "bg-[color:var(--color-ice)] text-[color:var(--color-plum)]"
      : "bg-[color:var(--color-flame)] text-[color:var(--color-chartreuse)]";
  return (
    <figure
      className="w-full"
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <div className="frame aspect-[4/5] w-full overflow-hidden">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <figcaption className={`${bg} p-6`}>
        <blockquote className="display text-xl sm:text-2xl leading-[1.05] break-words">
          {quote}
        </blockquote>
      </figcaption>
    </figure>
  );
}

export function SectionRule({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center gap-4 py-6">
      <div className="h-px flex-1 bg-[color:var(--color-plum)]/25" />
      {children}
      <div className="h-px flex-1 bg-[color:var(--color-plum)]/25" />
    </div>
  );
}

export function EntryCard({ entry, index }: { entry: Entry; index: number }) {
  const photo =
    entry.slug === "morabaraba"
      ? photos.chessSuits
      : entry.slug === "diketo"
      ? photos.skip
      : entry.slug === "hare-and-the-baboons"
      ? photos.chessTaxi
      : fallbackPhoto(entry.category);

  const num = String(index + 1).padStart(2, "0");
  return (
    <Link
      to="/entry/$slug"
      params={{ slug: entry.slug }}
      className="group grid grid-cols-12 items-end gap-6 border-b border-[color:var(--color-plum)]/20 py-6 no-underline"
    >
      <div className="col-span-2 sm:col-span-1">
        <div className="display text-3xl sm:text-5xl leading-none text-[color:var(--color-flame)]">{num}</div>
      </div>
      <div className="col-span-10 sm:col-span-6">
        <div className="display text-2xl sm:text-4xl text-[color:var(--color-plum)] group-hover:text-[color:var(--color-flame)] transition-colors">
          {entry.title_home}
        </div>
        <div className="mt-1 text-sm text-[color:var(--color-plum)]/70">{entry.title_en}</div>
      </div>
      <div className="col-span-6 sm:col-span-3 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/80">
        <div>
          <span className={`inline-block rounded-sm px-2 py-0.5 mr-2 ${entry.type === "game" ? "bg-[color:var(--color-chartreuse)]" : "bg-[color:var(--color-ice)]"} text-[color:var(--color-plum)]`}>
            {entry.type}
          </span>
          {entry.home_language}
        </div>
        <div className="mt-2">{entry.province}</div>
        <div className="mt-1 opacity-70">{entry.community_credit}</div>
      </div>
      <div className="col-span-6 sm:col-span-2">
        <div className="frame aspect-square w-full">
          <img src={photo.url} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    </Link>
  );
}
