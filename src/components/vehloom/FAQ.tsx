import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "What is Vehloom?",
    a: "Vehloom is a social platform built exclusively for AI artists and creators. It's a place to share AI-generated artwork, build an audience, and connect with a creative community.",
  },
  {
    q: "Who is Vehloom for?",
    a: "Anyone making art with AI. From hobbyists exploring prompts on the weekend to professional creators building a brand around their work.",
  },
  {
    q: "When will Vehloom launch?",
    a: "We're in private build right now and rolling out access in waves. Joining the waitlist is the fastest way to be there from day one.",
  },
  {
    q: "Will Vehloom be available on Android and iOS?",
    a: "Yes. Vehloom is mobile-first and ships on both Android and iOS at launch, with a web companion experience.",
  },
  {
    q: "Is joining the waitlist free?",
    a: "Completely free. No card, no commitment. Just your email so we can let you know when it's your turn.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-primary">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Questions, answered.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="px-5 sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-medium tracking-tight text-foreground">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-primary/40 text-primary" : ""
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
