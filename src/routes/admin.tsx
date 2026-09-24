import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Mail, ShieldAlert, ArrowRight, Download, Users, LogOut, MessageSquare, AlertTriangle, CheckCircle, Clock, Trash2 } from "lucide-react";
import type { HelpCenterQuery, ProblemReport } from "../types/responses";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type WaitlistEntry = {
  id: string;
  email: string;
  created_at: string;
};

type Tab = "waitlist" | "help-queries" | "problem-reports";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("waitlist");

  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [helpQueries, setHelpQueries] = useState<HelpCenterQuery[]>([]);
  const [problemReports, setProblemReports] = useState<ProblemReport[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "vehloom2026";
    
    if (password === correctPassword) {
      setAuthenticated(true);
      fetchAllData();
    } else {
      setError("Incorrect password");
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    
    try {
      // Fetch waitlist
      const { data: waitlistData, error: waitlistError } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!waitlistError) {
        setWaitlistEntries(waitlistData || []);
      }

      // Fetch help queries
      const { data: queriesData, error: queriesError } = await supabase
        .from("help_center_queries")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!queriesError) {
        setHelpQueries(queriesData || []);
      }

      // Fetch problem reports
      const { data: reportsData, error: reportsError } = await supabase
        .from("problem_reports")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!reportsError) {
        setProblemReports(reportsData || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const updateQueryStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("help_center_queries")
        .update({ status })
        .eq("id", id);
      
      if (!error) {
        setHelpQueries(helpQueries.map(q => q.id === id ? { ...q, status: status as any } : q));
      }
    } catch (err) {
      console.error("Error updating query:", err);
    }
  };

  const updateReportStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("problem_reports")
        .update({ status })
        .eq("id", id);
      
      if (!error) {
        setProblemReports(problemReports.map(r => r.id === id ? { ...r, status: status as any } : r));
      }
    } catch (err) {
      console.error("Error updating report:", err);
    }
  };

  const deleteQuery = async (id: string) => {
    if (confirm("Are you sure you want to delete this query?")) {
      try {
        const { error } = await supabase
          .from("help_center_queries")
          .delete()
          .eq("id", id);
        
        if (!error) {
          setHelpQueries(helpQueries.filter(q => q.id !== id));
        }
      } catch (err) {
        console.error("Error deleting query:", err);
      }
    }
  };

  const deleteReport = async (id: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      try {
        const { error } = await supabase
          .from("problem_reports")
          .delete()
          .eq("id", id);
        
        if (!error) {
          setProblemReports(problemReports.filter(r => r.id !== id));
        }
      } catch (err) {
        console.error("Error deleting report:", err);
      }
    }
  };

  const handleSignOut = () => {
    setAuthenticated(false);
    setPassword("");
    setWaitlistEntries([]);
    setHelpQueries([]);
    setProblemReports([]);
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
            <p className="mt-1 text-sm text-muted-foreground">Access the admin dashboard</p>
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
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage waitlist, help queries, and problem reports</p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface/80"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </header>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Waitlist</p>
                <p className="text-3xl font-bold text-foreground">{waitlistEntries.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary/50" />
            </div>
          </div>
          
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Help Queries</p>
                <p className="text-3xl font-bold text-foreground">{helpQueries.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500/50" />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Queries</p>
                <p className="text-3xl font-bold text-foreground">{helpQueries.filter(q => q.status === 'new').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500/50" />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Problem Reports</p>
                <p className="text-3xl font-bold text-foreground">{problemReports.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500/50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-border">
          {(['waitlist', 'help-queries', 'problem-reports'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'waitlist' ? 'Waitlist' : tab === 'help-queries' ? 'Help Queries' : 'Problem Reports'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'waitlist' && <WaitlistTab entries={waitlistEntries} loading={loading} />}
        {activeTab === 'help-queries' && (
          <HelpQueriesTab 
            queries={helpQueries} 
            loading={loading}
            onUpdateStatus={updateQueryStatus}
            onDelete={deleteQuery}
          />
        )}
        {activeTab === 'problem-reports' && (
          <ProblemReportsTab 
            reports={problemReports} 
            loading={loading}
            onUpdateStatus={updateReportStatus}
            onDelete={deleteReport}
          />
        )}
      </div>
    </div>
  );
}

// Waitlist Tab Component
function WaitlistTab({ entries, loading }: { entries: WaitlistEntry[]; loading: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface/50 text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-3 font-medium">Email Address</th>
              <th className="px-6 py-3 font-medium">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                  Loading...
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
  );
}

// Help Queries Tab Component
function HelpQueriesTab({
  queries,
  loading,
  onUpdateStatus,
  onDelete,
}: {
  queries: HelpCenterQuery[];
  loading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : queries.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No help queries yet.</div>
      ) : (
        queries.map((query) => (
          <div key={query.id} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{query.subject}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    query.status === 'new' ? 'bg-blue-500/20 text-blue-600' :
                    query.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-600' :
                    'bg-green-500/20 text-green-600'
                  }`}>
                    {query.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">By: {query.name} ({query.email})</p>
              </div>
              <button
                onClick={() => onDelete(query.id!)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{query.message}</p>
            <div className="flex gap-2">
              <select
                value={query.status || 'new'}
                onChange={(e) => onUpdateStatus(query.id!, e.target.value)}
                className="px-3 py-2 rounded bg-surface border border-border text-sm"
              >
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {new Date(query.created_at!).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

// Problem Reports Tab Component
function ProblemReportsTab({
  reports,
  loading,
  onUpdateStatus,
  onDelete,
}: {
  reports: ProblemReport[];
  loading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : reports.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No problem reports yet.</div>
      ) : (
        reports.map((report) => (
          <div key={report.id} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{report.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    report.severity === 'critical' ? 'bg-red-500/20 text-red-600' :
                    report.severity === 'high' ? 'bg-orange-500/20 text-orange-600' :
                    report.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-600' :
                    'bg-blue-500/20 text-blue-600'
                  }`}>
                    {report.severity}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    report.status === 'new' ? 'bg-blue-500/20 text-blue-600' :
                    report.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-600' :
                    'bg-green-500/20 text-green-600'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">By: {report.name} ({report.email})</p>
                <p className="text-xs text-muted-foreground mt-1">Category: {report.category}</p>
              </div>
              <button
                onClick={() => onDelete(report.id!)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
            {report.steps_to_reproduce && (
              <p className="text-sm text-muted-foreground mb-4"><strong>Steps:</strong> {report.steps_to_reproduce}</p>
            )}
            <div className="flex gap-2">
              <select
                value={report.status || 'new'}
                onChange={(e) => onUpdateStatus(report.id!, e.target.value)}
                className="px-3 py-2 rounded bg-surface border border-border text-sm"
              >
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="fixed">Fixed</option>
                <option value="wontfix">Won't Fix</option>
                <option value="duplicate">Duplicate</option>
              </select>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {new Date(report.created_at!).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
