import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/vehloom/Nav";
import { Footer } from "@/components/vehloom/Footer";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { ProblemReport } from "@/types/responses";

export const Route = createFileRoute("/report-problem")(({
  head: () => ({
    meta: [
      { title: "Report a Problem - Vehloom" },
      {
        name: "description",
        content: "Report technical issues, bugs, or problems you've encountered on Vehloom. Help us improve the platform.",
      },
    ],
  }),
  component: ReportProblem,
}));

function ReportProblem() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "bug" as "bug" | "feature" | "performance" | "crash" | "other",
    severity: "medium" as "low" | "medium" | "high" | "critical",
    title: "",
    description: "",
    steps: "",
    screenshots: "" as string | FileList,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        screenshots: e.target.files!,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.title || !formData.description) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      let fileUrl: string | undefined;

      // Upload file to Supabase Storage if provided
      if (formData.screenshots && formData.screenshots instanceof FileList && formData.screenshots.length > 0) {
        const file = formData.screenshots[0];
        const fileName = `reports/${Date.now()}_${file.name}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from("problem-reports")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          setError("Failed to upload file. Continuing without attachment...");
        } else if (data) {
          const { data: publicUrlData } = supabase.storage
            .from("problem-reports")
            .getPublicUrl(fileName);
          fileUrl = publicUrlData.publicUrl;
        }
      }

      // Prepare data for Supabase
      const reportData: ProblemReport = {
        name: formData.name,
        email: formData.email,
        category: formData.category,
        severity: formData.severity,
        title: formData.title,
        description: formData.description,
        steps_to_reproduce: formData.steps || undefined,
        status: "new",
        file_url: fileUrl,
        user_resolution_status: "pending",
      };

      // Insert into Supabase
      const { error: supabaseError } = await supabase
        .from("problem_reports")
        .insert([reportData]);

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        setError("Failed to submit your report. Please try again.");
        setLoading(false);
        return;
      }

      // Success
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        category: "bug",
        severity: "medium",
        title: "",
        description: "",
        steps: "",
        screenshots: "" as string | FileList,
      });
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: "bug", label: "🐛 Bug Report" },
    { value: "feature", label: "💡 Feature Request" },
    { value: "performance", label: "⚡ Performance Issue" },
    { value: "crash", label: "💥 App Crash" },
    { value: "other", label: "❓ Other" },
  ];

  const severities = [
    { value: "low", label: "Low - Minor inconvenience" },
    { value: "medium", label: "Medium - Affects functionality" },
    { value: "high", label: "High - Significant impact" },
    { value: "critical", label: "Critical - Complete failure" },
  ];

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-background to-background/80 px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Report a Problem</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Help us improve Vehloom by reporting issues you encounter. Your feedback is valuable.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-border bg-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Category and Severity Row */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1.5">
                    Issue Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="severity" className="block text-sm font-medium text-foreground mb-1.5">
                    Severity Level
                  </label>
                  <select
                    id="severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
                  >
                    {severities.map((sev) => (
                      <option key={sev.value} value={sev.value}>
                        {sev.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">
                  Problem Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  placeholder="Brief description of the problem"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                  placeholder="Please provide as much detail as possible about the issue..."
                />
              </div>

              {/* Steps to Reproduce */}
              <div>
                <label htmlFor="steps" className="block text-sm font-medium text-foreground mb-1.5">
                  Steps to Reproduce (if applicable)
                </label>
                <textarea
                  id="steps"
                  name="steps"
                  value={formData.steps}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                  placeholder="1. Step one&#10;2. Step two&#10;3. Step three"
                />
              </div>

              {/* File Upload */}
              <div>
                <label htmlFor="screenshots" className="block text-sm font-medium text-foreground mb-1.5">
                  Attach Screenshots or Files
                </label>
                <div className="relative rounded-lg border border-input border-dashed p-6 text-center">
                  <input
                    type="file"
                    id="screenshots"
                    name="screenshots"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*,.pdf,.txt,.log"
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <div className="pointer-events-none">
                    <p className="text-sm font-medium text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, PDF, TXT, LOG up to 10MB each
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {submitted && (
                <div className="flex gap-3 rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-600">Problem reported successfully!</p>
                    <p className="text-sm text-green-600/80 mt-0.5">
                      We've received your report and will investigate it. We'll be in touch if we need more information.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-8 rounded-lg border border-border bg-card/50 p-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground block mb-2">💡 Tip:</span>
              The more details you provide, the faster we can help you. Include your device type, browser version, and any error messages you see.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
