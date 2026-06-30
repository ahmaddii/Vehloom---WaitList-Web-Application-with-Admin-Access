import { Reveal } from "./Reveal";
import {
  Palette,
  Heart,
  Globe2,
  MessagesSquare,
  BookOpen,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Palette,
    title: "Share AI Artwork",
    body: "Showcase your AI creations in a feed designed to make every piece feel like a gallery print.",
  },
  {
    icon: Heart,
    title: "Grow Your Audience",
    body: "Build a creative identity that compounds with every post, like and follow.",
  },
  {
    icon: Globe2,
    title: "Discover Creators",
    body: "Explore artwork from a worldwide community of AI artists, curated for inspiration.",
  },
  {
    icon: MessagesSquare,
    title: "Community Interaction",
    body: "Like, comment and DM. Vehloom is built for conversations between creators.",
  },
  {
    icon: BookOpen,
    title: "Stories",
    body: "Share the prompts, processes and ideas behind each creation in a dedicated story space.",
  },
  {
    icon: Rocket,
    title: "Creator Profiles",
    body: "Your personal creative portfolio. Clean, fast and made to be remembered.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Why Vehloom</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Designed for the way creators actually work.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Every feature exists to make sharing AI artwork feel effortless, and
            building an audience feel meaningful.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/25 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
