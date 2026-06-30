import { Reveal } from "./Reveal";
import { PhoneMockup } from "./PhoneMockup";

export function ProductPreview() {
  return (
    <section id="preview" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[420px]"
        style={{ background: "var(--gradient-fade)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Product</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            A canvas in your pocket.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Vehloom is built mobile-first — a quiet, premium space to post, scroll
            and discover AI art that actually moves you.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-end justify-items-center gap-10 md:grid-cols-3">
          <Reveal delay={0.1} className="md:translate-y-6">
            <div className="scale-90">
              <PhoneMockup />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <PhoneMockup />
          </Reveal>
          <Reveal delay={0.15} className="md:translate-y-6">
            <div className="scale-90">
              <PhoneMockup />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
