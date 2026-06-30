import { Reveal } from "./Reveal";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import img2 from "@/assets/2.png";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";

const badges = [
  { label: "AI Artists", icon: "✦" },
  { label: "Digital Creators", icon: "◈" },
  { label: "Creative Community", icon: "❋" },
  { label: "Global Platform", icon: "◉" },
];

const artworks = [art1, art2, art3, art4, art5, art6, img2, img3, img4, img5, img6, img7, img8];
// Duplicate for seamless infinite loop
const marqueeItems = [...artworks, ...artworks];

export function TrustedBadges() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/30 py-16">
      {/* Heading */}
      <Reveal className="mx-auto max-w-5xl px-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Built for the next generation
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Where AI art comes alive
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Join thousands of AI artists and digital creators sharing their work
          on the platform built for the creative revolution.
        </p>

        {/* Badge pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {badges.map(({ label, icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              <span className="text-primary text-[10px]">{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Scrolling art gallery */}
      <div className="mt-12 relative">
        {/* Left fade mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        {/* Right fade mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 — left to right */}
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 gap-4 animate-marquee">
            {marqueeItems.map((src, i) => (
              <div
                key={`row1-${i}`}
                className="shrink-0 w-52 h-48 rounded-xl overflow-hidden border border-border/40 shadow-soft"
              >
                <img
                  src={src}
                  alt={`AI artwork ${(i % artworks.length) + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right to left (reverse) */}
        <div className="flex overflow-hidden mt-4">
          <div className="flex shrink-0 gap-4 animate-marquee-reverse">
            {[...marqueeItems].reverse().map((src, i) => (
              <div
                key={`row2-${i}`}
                className="shrink-0 w-52 h-48 rounded-xl overflow-hidden border border-border/40 shadow-soft"
              >
                <img
                  src={src}
                  alt={`AI artwork ${(i % artworks.length) + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
