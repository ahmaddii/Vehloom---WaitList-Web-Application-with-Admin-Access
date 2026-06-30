import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, PartyPopper, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { supabase } from "@/lib/supabase";

// Floating orb definitions — position, size, animation delay, color
const orbs = [
  { cx: "15%", cy: "30%", r: 180, color: "rgba(254,90,78,0.13)", delay: "0s", dur: "8s" },
  { cx: "85%", cy: "20%", r: 140, color: "rgba(254,90,78,0.09)", delay: "1.5s", dur: "11s" },
  { cx: "50%", cy: "80%", r: 220, color: "rgba(254,90,78,0.07)", delay: "3s", dur: "9s" },
  { cx: "75%", cy: "65%", r: 100, color: "rgba(255,150,100,0.08)", delay: "0.8s", dur: "13s" },
  { cx: "25%", cy: "75%", r: 130, color: "rgba(254,90,78,0.06)", delay: "2s", dur: "10s" },
];

// Grid dots for the blueprint / circuit board feel
const dots: { x: string; y: string }[] = [];
for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 14; col++) {
    dots.push({
      x: `${(col / 13) * 100}%`,
      y: `${(row / 8) * 100}%`,
    });
  }
}

export function Waitlist() {
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
    <section id="waitlist" className="relative overflow-hidden py-24 sm:py-32">

      {/* ── Unique background ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Dark base with subtle warm tint */}
        <div className="absolute inset-0" style={{ background: "oklch(0.14 0.015 55)" }} />

        {/* Fine dot-grid blueprint */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r="1.2" fill="#FE5A4E" />
          ))}
        </svg>

        {/* Diagonal faint lines */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#FE5A4E" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)" />
        </svg>

        {/* Floating animated orbs */}
        {orbs.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.cx,
              top: orb.cy,
              width: orb.r * 2,
              height: orb.r * 2,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              animation: `float-orb ${orb.dur} ease-in-out infinite alternate`,
              animationDelay: orb.delay,
              filter: "blur(2px)",
            }}
          />
        ))}

        {/* Center radial spotlight */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[500px] w-[700px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(254,90,78,0.10) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Top and bottom edge fades so it blends into surrounding sections */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Early access</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Join the waitlist.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Be among the first creators to experience Vehloom. Early members get
            their handle, a launch-day badge, and access to creator features first.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-md">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -12 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-primary/30 bg-card/80 backdrop-blur-md px-8 py-8 shadow-glow"
                >
                  {/* Icon */}
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30 text-primary">
                    <PartyPopper className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <p className="text-xl font-bold tracking-tight text-foreground">
                    You're in. Welcome to Vehloom. 🎉
                  </p>

                  {/* Subtitle */}
                  <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
                    Your spot is secured. We'll reach out the moment the gates open. Keep creating until then.
                  </p>

                  {/* Divider */}
                  <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Footer hint */}
                  <p className="text-xs text-muted-foreground/70">
                    Early members get their handle + a launch-day badge 🏅
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/70" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@studio.com"
                      className="h-12 w-full rounded-2xl border border-border bg-surface/50 pl-11 pr-4 text-base text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ring/40"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:bg-primary/90 hover:translate-y-[-1px] active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:active:scale-100"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                  className="mt-4 text-center text-sm font-medium text-red-500"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
            <p className="mt-3 text-xs text-muted-foreground">
              No spam. Just one launch email when Vehloom is ready.
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes float-orb {
          0%   { transform: translate(-50%, -50%) scale(1);   }
          100% { transform: translate(-50%, -58%) scale(1.12); }
        }
      `}</style>
    </section>
  );
}
