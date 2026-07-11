import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { VehloomMark } from "./Logo";
import { FloatingBadges } from "./FloatingBadges";
import { supabase } from "@/lib/supabase";
import appIcon from "@/assets/app-icon/Ventlum.png";
import googlePlayIcon from "@/assets/google-play.png";
import art1 from "@/assets/art-1.jpg";

export function Hero() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    const { error: supaError } = await supabase.from("waitlist").insert([{ email }]);
    setLoading(false);

    if (supaError) {
      if (supaError.code === "23505") setError("You're already on the list!");
      else setError(`Error: ${supaError.message || "Failed to join waitlist."}`);
    } else {
      setSent(true);
    }
  };

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      {/* background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

      <FloatingBadges />

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 flex items-center justify-center gap-2"
        >
          <VehloomMark className="h-9 w-9" />
          <span className="text-xl font-semibold tracking-tight">Vehloom</span>
          {/* Single floating art pic — mobile only */}
          <motion.div
            className="sm:hidden ml-1 h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40 shadow-glow"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={art1} alt="AI artwork" className="h-full w-full object-cover" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl md:text-[68px]"
        >
          Where Creativity{" "}
          <span className="relative inline-block">
            <span className="text-gradient-primary">Blooms</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8 Q 50 2 100 6 T 198 6"
                stroke="#FE5A4E"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-7 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          The social platform built for AI artists and creators. Share your work
          discover inspiring minds and grow inside a global creative community.
        </motion.p>

        {/* email + cta */}
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-9 w-full max-w-md rounded-2xl border border-primary/30 bg-card/80 backdrop-blur-sm px-6 py-5 shadow-glow"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">You're officially on the list! 🎉</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    We'll Email you the moment Vehloom opens its doors. Stay creative.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="mx-auto mt-9 flex w-full max-w-md flex-col items-stretch gap-2 sm:flex-row sm:items-center"
            >
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="h-11 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:bg-primary/90 hover:translate-y-[-1px] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Join the Waitlist
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 text-xs text-muted-foreground"
        >
          <a href="#features" className="underline-offset-4 hover:text-foreground hover:underline">
            Learn more about Vehloom →
          </a>
        </motion.div>

        {/* playstore badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 sm:mt-20 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-4 shadow-xl">
            <img
              src={appIcon}
              alt="Vehloom App"
              className="h-12 w-12 rounded-xl object-cover shadow-md ring-1 ring-border/50"
            />
            <div className="flex flex-col items-start border-l border-border/60 pl-4">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Coming Soon On
              </span>
              <div className="mt-0.5 flex items-center gap-2">
                <img src={googlePlayIcon} alt="Google Play" className="h-5 w-auto" />
                <span className="text-lg font-bold tracking-tight text-foreground">
                  Google Play
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
