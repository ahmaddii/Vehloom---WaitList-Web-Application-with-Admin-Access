import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Mail, ShieldAlert, ArrowRight, Download, Users, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type WaitlistEntry = {
  id: string;
  email: string;
  created_at: string;
};

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use the password from the .env file
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "vehloom2026";
    
    if (password === correctPassword) {
      setAuthenticated(true);
      fetchEntries();
    } else {
      setError("Incorrect password");
    }
  };

  const fetchEntries = async () => {
    setLoading(true);
    
    // Fetch the exact total count first
    const { count, error: countError } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });
      
    if (!countError && count !== null) {
      setTotalCount(count);
    }

    // Fetch the latest 1000 entries (Supabase default limit)
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    
    if (error) {
      console.error(error);
      setError("Failed to fetch waitlist entries");
    } else {
      setEntries(data || []);
      if (countError || count === null) {
        setTotalCount(data?.length || 0);
      }
    }
    setLoading(false);
  };

  const handleEmailAll = () => {
    const emails = entries.map((e) => e.email).join(",");
    const subject = encodeURIComponent("Vehloom is live!");
    const body = encodeURIComponent("Hey Creator,\n\nVehloom is finally ready. Jump in here:\nhttps://vehloom.com\n\nStay creative.");
    // Open default mail client with all emails as BCC so they don't see each other
    window.location.href = `mailto:?bcc=${emails}&subject=${subject}&body=${body}`;
  };

  const handleSignOut = () => {
    setAuthenticated(false);
    setPassword("");
    setEntries([]);
    setTotalCount(0);
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Admin Login</h1>
            <p className="mt-1 text-sm text-muted-foreground">Access the waitlist dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
              {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Unlock Dashboard <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Waitlist Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your early access creators.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleEmailAll}
              disabled={entries.length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              <Mail className="h-4 w-4" />
              Email Everyone (BCC)
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface/80"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border px-6 py-4">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-medium text-foreground">
              Total Signed Up: <span className="font-bold text-primary">{totalCount.toLocaleString()}</span>
              {totalCount > entries.length && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (Showing latest {entries.length})
                </span>
              )}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">Email Address</th>
                  <th className="px-6 py-3 font-medium">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                      Loading entries...
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                      No one is on the waitlist yet.
                    </td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id} className="transition-colors hover:bg-surface/30">
                      <td className="px-6 py-4 font-medium text-foreground">{entry.email}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(entry.created_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
