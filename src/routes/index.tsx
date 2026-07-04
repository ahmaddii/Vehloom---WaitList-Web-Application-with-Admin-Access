import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/vehloom/Nav";
import { Hero } from "@/components/vehloom/Hero";
import { TrustedBadges } from "@/components/vehloom/TrustedBadges";
import { Features } from "@/components/vehloom/Features";
import { Community } from "@/components/vehloom/Community";
import { Waitlist } from "@/components/vehloom/Waitlist";
import { FAQ } from "@/components/vehloom/FAQ";
import { Footer } from "@/components/vehloom/Footer";
import { LaserDivider } from "@/components/vehloom/LaserDivider";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Vehloom — Where Creativity Blooms" },
      {
        name: "description",
        content:
          "The social platform built for AI artists and creators. Share AI artwork, discover creators, and join a global creative community. Get early access.",
      },
      { property: "og:title", content: "Vehloom for AI Artists - Creativity Blooms" },
      {
        property: "og:description",
        content:
          "The social platform built for AI artists and creators. Join the waitlist.",
      },
    ],
  }),
  component: Landing,
}));

function Landing() {
  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <LaserDivider />
      <TrustedBadges />
      <LaserDivider />
      <Features />
      <LaserDivider />
      <Community />
      <LaserDivider />
      <Waitlist />
      <LaserDivider />
      <FAQ />
      <LaserDivider />
      <Footer />
    </main>
  );
}
