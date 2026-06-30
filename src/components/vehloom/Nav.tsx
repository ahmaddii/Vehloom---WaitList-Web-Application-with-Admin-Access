import { useEffect, useState } from "react";
import { VehloomWordmark } from "./Logo";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#preview" },
  { label: "Community", href: "#community" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Navbar bar ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled && !menuOpen
            ? "border-b border-border/60 bg-background/90 backdrop-blur-xl"
            : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          {/* Logo */}
          <a href="#top" className="flex items-center" onClick={closeMenu}>
            <VehloomWordmark />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#waitlist"
            className="hidden group md:inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-all hover:bg-primary/90 hover:shadow-[0_24px_70px_-20px_rgba(254,90,78,0.65)]"
          >
            Join waitlist
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Hamburger toggle — mobile only */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[60] grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-card/80 backdrop-blur-sm text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/80 backdrop-blur-2xl md:hidden"
            style={{ WebkitBackdropFilter: "blur(32px)" }}
          >
            {/* Nav links — centered, bold, large */}
            <div className="relative flex flex-1 flex-col items-center justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex w-full max-w-xs items-center justify-center rounded-2xl py-4 text-2xl font-bold tracking-tight text-foreground/80 transition-colors hover:text-foreground"
                >
                  {/* Hover pill highlight */}
                  <span className="absolute inset-0 rounded-2xl bg-card opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative">{link.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative px-6 pb-10 pt-4"
            >
              {/* Thin separator */}
              <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

              <a
                href="#waitlist"
                onClick={closeMenu}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-glow transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                Join the Waitlist
                <ArrowRight className="h-5 w-5" />
              </a>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Free to join. No credit card required.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
