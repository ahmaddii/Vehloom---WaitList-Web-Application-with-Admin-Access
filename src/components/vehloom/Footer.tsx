import { VehloomMark } from "./Logo";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/135264283/admin/dashboard/",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/ahmaddii",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:pulsarx.inc@gmail.com",
  },
  {
    icon: Globe,
    label: "Website",
    href: "https://my-pulsarx-project.vercel.app/",
  },
];

const cols = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Waitlist", href: "#waitlist" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/135264283/admin/dashboard/" },
      { label: "GitHub", href: "https://github.com/ahmaddii" },
      { label: "Contact", href: "mailto:pulsarx.inc@gmail.com" },
      { label: "PulsarX", href: "https://my-pulsarx-project.vercel.app/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/40 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2">
            <VehloomMark className="h-9 w-9" />
            <span className="text-lg font-bold tracking-tight">Vehloom</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Where creativity blooms. The social platform built for AI artists
            and creators.
          </p>

          {/* Social icons */}
          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Email text */}
          <a
            href="mailto:pulsarx.inc@gmail.com"
            className="mt-3 inline-block text-xs text-muted-foreground/70 transition-colors hover:text-primary"
          >
            pulsarx.inc@gmail.com
          </a>
        </div>

        {/* Nav columns */}
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
              {c.title}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-border px-5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <span>© 2026 Vehloom. All rights reserved.</span>
        <span>
          Built by{" "}
          <a
            href="https://github.com/ahmaddii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4"
          >
            @ahmaddii
          </a>
        </span>
      </div>
    </footer>
  );
}
