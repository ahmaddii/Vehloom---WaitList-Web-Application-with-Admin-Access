import { Reveal } from "./Reveal";
import art3 from "@/assets/art-3.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import art4 from "@/assets/art-4.jpg";

export function Community() {
  return (
    <section id="community" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Community</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            A home for AI creativity.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Vehloom is a place to find the people whose work makes you want to
            make more. Follow artists you love, share what inspired you, and
            collaborate on the next idea before anyone else sees it.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-foreground/80">
            {[
              "Curated discovery, not infinite noise.",
              "Conversations between creators, not creators and crowds.",
              "Stories that document the craft behind every post.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-3">
            <img src={art3} alt="" width={768} height={1024} loading="lazy" className="aspect-[3/4] w-full rounded-2xl object-cover shadow-soft" />
            <img src={art6} alt="" width={768} height={1024} loading="lazy" className="aspect-[3/4] w-full translate-y-8 rounded-2xl object-cover shadow-soft" />
            <img src={art4} alt="" width={768} height={1024} loading="lazy" className="aspect-[3/4] w-full -translate-y-2 rounded-2xl object-cover shadow-soft" />
            <img src={art5} alt="" width={768} height={1024} loading="lazy" className="aspect-[3/4] w-full translate-y-6 rounded-2xl object-cover shadow-soft" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
