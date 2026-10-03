import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Mail, ShieldAlert, ArrowRight, Download, Users, LogOut, MessageSquare, AlertTriangle, CheckCircle, Clock, Trash2, User, Calendar, Tag, Flag, Info, FileText, Fingerprint, Image as ImageIcon } from "lucide-react";
import type { HelpCenterQuery, ProblemReport, Report } from "../types/responses";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type WaitlistEntry = {
  id: string;
  email: string;
  created_at: string;
};

type Tab = "waitlist" | "help-queries" | "problem-reports" | "content-reports";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("waitlist");

  const [waitlistEntries, setWaitlistEntries] = useState<WaitlistEntry[]>([]);
  const [helpQueries, setHelpQueries] = useState<HelpCenterQuery[]>([]);
  const [problemReports, setProblemReports] = useState<ProblemReport[]>([]);
  const [contentReports, setContentReports] = useState<Report[]>([]);

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

      // Fetch content reports
      const { data: contentData, error: contentError } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!contentError) {
        setContentReports(contentData || []);
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

  const updateContentReportStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({ status })
        .eq("id", id);
      
      if (!error) {
        setContentReports(contentReports.map(r => r.id === id ? { ...r, status } : r));
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

  const deleteContentReport = async (id: string) => {
    if (confirm("Are you sure you want to delete this content report?")) {
      try {
        const { error } = await supabase
          .from("reports")
          .delete()
          .eq("id", id);
        
        if (!error) {
          setContentReports(contentReports.filter(r => r.id !== id));
        }
      } catch (err) {
        console.error("Error deleting content report:", err);
      }
    }
  };

  const handleSignOut = () => {
    setAuthenticated(false);
    setPassword("");
    setWaitlistEntries([]);
    setHelpQueries([]);
    setProblemReports([]);
    setContentReports([]);
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
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
              <AlertTriangle className="h-8 w-8 text-orange-500/50" />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Content Reports</p>
                <p className="text-3xl font-bold text-foreground">{contentReports.length}</p>
              </div>
              <ShieldAlert className="h-8 w-8 text-red-500/50" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-border overflow-x-auto">
          {(['waitlist', 'help-queries', 'problem-reports', 'content-reports'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'waitlist' ? 'Waitlist' : tab === 'help-queries' ? 'Help Queries' : tab === 'problem-reports' ? 'Problem Reports' : 'Content Reports'}
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
        {activeTab === 'content-reports' && (
          <ContentReportsTab 
            reports={contentReports} 
            loading={loading}
            onUpdateStatus={updateContentReportStatus}
            onDelete={deleteContentReport}
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {loading ? (
        <div className="col-span-full text-center py-12 text-muted-foreground animate-pulse">Loading queries...</div>
      ) : queries.length === 0 ? (
        <div className="col-span-full text-center py-12 text-muted-foreground flex flex-col items-center">
          <MessageSquare className="h-12 w-12 mb-4 text-muted-foreground/30" />
          <p>No help queries yet.</p>
        </div>
      ) : (
        queries.map((query) => (
          <div key={query.id} className="group relative flex flex-col rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30 hover:bg-card">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-semibold text-lg text-foreground line-clamp-1">{query.subject}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    query.status === 'new' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                    query.status === 'in-progress' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  }`}>
                    {query.status?.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span className="truncate max-w-[150px]">{query.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    <a href={`mailto:${query.email}`} className="truncate max-w-[200px] hover:text-primary transition-colors">{query.email}</a>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDelete(query.id!)}
                className="p-2 text-red-500/70 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                title="Delete Query"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-1 rounded-xl bg-surface/50 p-4 mb-5 text-sm text-foreground/80 leading-relaxed border border-border/30 whitespace-pre-wrap">
              {query.message}
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <select
                  value={query.status || 'new'}
                  onChange={(e) => onUpdateStatus(query.id!, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-border/50 text-sm font-medium hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer shadow-sm"
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(query.created_at!).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {loading ? (
        <div className="col-span-full text-center py-12 text-muted-foreground animate-pulse">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="col-span-full text-center py-12 text-muted-foreground flex flex-col items-center">
          <AlertTriangle className="h-12 w-12 mb-4 text-muted-foreground/30" />
          <p>No problem reports yet.</p>
        </div>
      ) : (
        reports.map((report) => (
          <div key={report.id} className="group flex flex-col rounded-2xl border border-border/50 bg-card/50 shadow-sm transition-all hover:shadow-md hover:border-primary/30 hover:bg-card overflow-hidden">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h3 className="font-semibold text-lg text-foreground">{report.title}</h3>
                    
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 ${
                      report.severity === 'critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      report.severity === 'high' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      report.severity === 'medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      <Flag className="h-3 w-3" />
                      {report.severity.toUpperCase()}
                    </span>

                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      report.status === 'new' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      report.status === 'in-progress' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      report.status === 'fixed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      'bg-stone-500/10 text-stone-500 border-stone-500/20'
                    }`}>
                      {report.status?.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      <span>{report.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      <a href={`mailto:${report.email}`} className="hover:text-primary transition-colors">{report.email}</a>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" />
                      <span className="capitalize">{report.category}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(report.id!)}
                  className="p-2 text-red-500/70 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100 shrink-0"
                  title="Delete Report"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4 mb-2 flex-1">
                <div className="rounded-xl bg-surface/40 p-4 border border-border/30">
                  <h4 className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    <Info className="h-3.5 w-3.5" /> Description
                  </h4>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{report.description}</p>
                </div>
                
                {report.steps_to_reproduce && (
                  <div className="rounded-xl bg-surface/40 p-4 border border-border/30">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      <FileText className="h-3.5 w-3.5" /> Steps to Reproduce
                    </h4>
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{report.steps_to_reproduce}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-surface/30 px-6 py-4 flex items-center justify-between border-t border-border/50">
              <select
                value={report.status || 'new'}
                onChange={(e) => onUpdateStatus(report.id!, e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-surface border border-border/50 text-sm font-medium hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer shadow-sm"
              >
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="fixed">Fixed</option>
                <option value="wontfix">Won't Fix</option>
                <option value="duplicate">Duplicate</option>
              </select>
              
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(report.created_at!).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Content Reports Tab Component
function ContentReportsTab({
  reports,
  loading,
  onUpdateStatus,
  onDelete,
}: {
  reports: Report[];
  loading: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {loading ? (
        <div className="col-span-full text-center py-12 text-muted-foreground animate-pulse">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="col-span-full text-center py-12 text-muted-foreground flex flex-col items-center">
          <ShieldAlert className="h-12 w-12 mb-4 text-muted-foreground/30" />
          <p>No content reports yet.</p>
        </div>
      ) : (
        reports.map((report) => (
          <div key={report.id} className="group flex flex-col rounded-2xl border border-border/50 bg-card/50 shadow-sm transition-all hover:shadow-md hover:border-red-500/30 hover:bg-card overflow-hidden">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h3 className="font-semibold text-lg text-foreground">{report.reason}</h3>
                    
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      report.status === 'pending' || report.status === 'new' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      report.status === 'reviewed' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      report.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      'bg-stone-500/10 text-stone-500 border-stone-500/20'
                    }`}>
                      {report.status?.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap bg-surface/50 p-3 rounded-lg border border-border/30">
                    {report.reporter_id && (
                      <div className="flex items-center gap-1.5" title="Reporter ID">
                        <User className="h-3.5 w-3.5 text-primary/70" />
                        <span className="font-mono text-xs">{report.reporter_id.slice(0, 8)}...</span>
                      </div>
                    )}
                    {report.reported_user_id && (
                      <div className="flex items-center gap-1.5" title="Reported User ID">
                        <Fingerprint className="h-3.5 w-3.5 text-red-500/70" />
                        <span className="font-mono text-xs">{report.reported_user_id.slice(0, 8)}...</span>
                      </div>
                    )}
                    {report.artwork_id && (
                      <div className="flex items-center gap-1.5" title="Artwork ID">
                        <ImageIcon className="h-3.5 w-3.5 text-blue-500/70" />
                        <span className="font-mono text-xs">{report.artwork_id.slice(0, 8)}...</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onDelete(report.id!)}
                  className="p-2 text-red-500/70 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100 shrink-0"
                  title="Delete Content Report"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4 mb-2 flex-1">
                {report.details && (
                  <div className="rounded-xl bg-surface/40 p-4 border border-border/30">
                    <h4 className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      <FileText className="h-3.5 w-3.5" /> Details
                    </h4>
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{report.details}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-surface/30 px-6 py-4 flex items-center justify-between border-t border-border/50">
              <select
                value={report.status || 'pending'}
                onChange={(e) => onUpdateStatus(report.id!, e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-surface border border-border/50 text-sm font-medium hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer shadow-sm"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
              
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(report.created_at!).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
