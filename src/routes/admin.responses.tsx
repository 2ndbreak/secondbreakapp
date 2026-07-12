import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthSession } from "@/hooks/useAuthSession";

export const Route = createFileRoute("/admin/responses")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Team responses — 2nd Break" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminResponses,
});

type Tab = "share" | "host" | "signups" | "contact";

const TABS: { id: Tab; label: string; table: string }[] = [
  { id: "share", label: "Share a Game", table: "share_submissions" },
  { id: "host", label: "Host a Break", table: "host_a_break_requests" },
  { id: "signups", label: "Signups", table: "playground_signups" },
  { id: "contact", label: "Contact", table: "contact_messages" },
];

function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    if (v == null) return "";
    const s = typeof v === "string" ? v : JSON.stringify(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
}

function AdminResponses() {
  const { user, loading } = useAuthSession();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("share");
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) { setIsAdmin(null); return; }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").then(({ data }) => {
      setIsAdmin((data ?? []).length > 0);
    });
  }, [user]);

  useEffect(() => {
    if (isAdmin !== true) return;
    const t = TABS.find((x) => x.id === tab)!;
    setFetching(true);
    setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from(t.table as any).select("*").order("created_at", { ascending: false }) as any)
      .then(({ data, error }: { data: Record<string, unknown>[] | null; error: { message: string } | null }) => {
        if (error) setError(error.message);
        setRows(data ?? []);
        setFetching(false);
      });
  }, [tab, isAdmin]);

  const cols = useMemo(() => (rows[0] ? Object.keys(rows[0]) : []), [rows]);

  function downloadCSV() {
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading || (user && isAdmin === null)) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-[color:var(--color-plum)]/60">Loading…</p>
      </div>
    );
  }

  if (!user || isAdmin === false) {
    return (
      <section className="color-paper">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="display text-4xl text-[color:var(--color-plum)]">This door is for the team.</h1>
          <p className="mt-4 text-[color:var(--color-plum)]/70">
            You need an admin account to view responses.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            {!user ? (
              <Link to="/auth" className="rounded-md bg-[color:var(--color-flame)] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)]">
                Log in
              </Link>
            ) : null}
            <Link to="/" className="rounded-md border border-[color:var(--color-plum)]/30 px-6 py-3 text-sm uppercase tracking-widest text-[color:var(--color-plum)]">
              Back home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="color-paper">
      <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="display text-4xl text-[color:var(--color-plum)]">Team responses</h1>
          <button
            onClick={downloadCSV}
            disabled={rows.length === 0}
            className="rounded-md bg-[color:var(--color-plum)] px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-chartreuse)] hover:bg-[color:var(--color-flame)] disabled:opacity-40"
          >
            Download CSV
          </button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 border-b border-[color:var(--color-plum)]/20 pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-t-md px-4 py-2 text-sm uppercase tracking-widest ${
                tab === t.id
                  ? "bg-[color:var(--color-flame)] text-[color:var(--color-chartreuse)]"
                  : "text-[color:var(--color-plum)]/70 hover:text-[color:var(--color-plum)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-md border border-[color:var(--color-plum)]/20 bg-white">
          {error && <p className="p-4 text-sm text-[color:var(--color-flame)]">{error}</p>}
          {fetching ? (
            <p className="p-6 text-sm text-[color:var(--color-plum)]/60">Loading…</p>
          ) : rows.length === 0 ? (
            <p className="p-6 text-sm text-[color:var(--color-plum)]/60">No entries yet.</p>
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[color:var(--color-plum)]/5 text-xs uppercase tracking-widest text-[color:var(--color-plum)]/70">
                <tr>
                  {cols.map((c) => <th key={c} className="whitespace-nowrap px-3 py-2">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-[color:var(--color-plum)]/10 align-top">
                    {cols.map((c) => (
                      <td key={c} className="max-w-[320px] whitespace-pre-wrap break-words px-3 py-2 text-[color:var(--color-plum)]">
                        {r[c] == null ? "" : typeof r[c] === "object" ? JSON.stringify(r[c]) : String(r[c])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
