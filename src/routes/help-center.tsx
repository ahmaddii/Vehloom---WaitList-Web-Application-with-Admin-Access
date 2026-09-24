import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/vehloom/Nav";
import { Footer } from "@/components/vehloom/Footer";
import { Mail, MessageSquare, Search, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { HelpCenterQuery } from "@/types/responses";

export const Route = createFileRoute("/help-center")(({
  head: () => ({
    meta: [
      { title: "Help Center - Vehloom" },
      {
        name: "description",
        content: "Get help and support for Vehloom. Find answers to common questions or send us your queries.",
      },
    ],
  }),
  component: HelpCenter,
}));

function HelpCenter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      // Prepare data for Supabase
      const queryData: HelpCenterQuery = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: "new",
        priority: "medium",
        response_sent: false,
      };

      // Insert into Supabase
      const { error: supabaseError } = await supabase
        .from("help_center_queries")
        .insert([queryData]);

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        setError("Failed to submit your query. Please try again.");
        setLoading(false);
        return;
      }

      // Success
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "How do I create an account on Vehloom?",
      answer: "Click on the 'Get Started' button on the homepage and follow the registration process. You can sign up using your email or social media accounts.",
    },
    {
      question: "How can I share my AI artwork?",
      answer: "After creating an account, navigate to the upload section and select your artwork file. Add a title, description, and tags to help other artists discover your work.",
    },
    {
      question: "Is Vehloom free to use?",
      answer: "Yes, Vehloom is free to use. We offer a community-driven platform for AI artists and creators to share and discover content.",
    },
    {
      question: "How do I connect with other artists?",
      answer: "Visit the Community section to discover other artists, view their work, and connect with them directly through messaging or comments.",
    },
    {
      question: "What file formats are supported?",
      answer: "We support common image formats including PNG, JPG, GIF, and WebP. You can also upload videos in MP4 and WebM formats.",
    },
    {
      question: "How do I report inappropriate content?",
      answer: "Each post has a report button. Click it and select the reason for reporting. Our moderation team will review it promptly.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-background to-background/80 px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Help Center</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to your questions or send us your queries. We're here to help!
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="border-b border-border px-5 py-8 md:py-12">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-6">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group cursor-pointer rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card/80"
              >
                <summary className="flex items-center justify-between font-medium text-foreground outline-none">
                  {faq.question}
                  <span className="ml-2 transition-transform group-open:rotate-180">
                    <svg
                      className="h-5 w-5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="border-b border-border px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Still need help?</h2>
              <p className="mt-3 text-muted-foreground">
                Can't find the answer you're looking for? Send us a message and we'll get back to you as soon as possible.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:support@vehloom.com" className="text-sm text-muted-foreground hover:text-primary">
                      support@vehloom.com
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Response Time</p>
                    <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email
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

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {error && (
                  <div className="flex gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {submitted && (
                  <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm text-green-600">
                    ✓ Thank you! We've received your message and will get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
