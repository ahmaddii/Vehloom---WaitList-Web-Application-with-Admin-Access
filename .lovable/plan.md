
## Vehloom Landing Page

A single-route, premium dark landing page using your full spec, with the hero composed exactly like the Shapaly reference you attached (centered logo + headline, email + CTA inline, phone mockup below center, floating circular badge-icons connected by flowing accent lines on the sides).

### Design system
- Background `#14120B`, cards dark charcoal, text white / light gray, primary accent premium red (`#E5484D` range) with soft glow
- Font: Inter (loaded via `<link>` in `__root.tsx`, registered in `@theme` in `src/styles.css`)
- Tokens added to `src/styles.css`: `--background`, `--card`, `--primary`, `--primary-glow`, `--muted-foreground`, `--gradient-primary`, `--shadow-glow`, subtle grid background utility
- Subtle motion only: fade/slide on scroll, hover lift on cards, button glow on hover (framer-motion)

### Sections (single route `/`)
1. **Nav** — small Vehloom wordmark left, minimal links right, "Join waitlist" red button
2. **Hero (reference-matched layout)**
   - Centered Vehloom logo + wordmark
   - H1: "Where Creativity **Blooms**." (underline accent on "Blooms")
   - Subtitle: "The social platform built for AI artists and creators."
   - Inline email input + red "Join the Waitlist" button, secondary "Learn More" ghost link
   - Phone mockup centered below the form (Vehloom app UI: feed of AI artworks, top tabs)
   - Floating circular badge-icons on left/right (AI Artists, Digital Creators, Creative Community, Global Platform, Stories, Profiles) connected by thin curved red/white SVG lines — mirrors the reference exactly
3. **Built for the next generation of AI creators** — row of 4 elegant pill badges
4. **Why Vehloom** — 6 feature cards (3×2 grid) with line icons from lucide-react, hover lift + subtle red glow
5. **Product Preview** — 2–3 phone mockups side by side (onboarding, feed, profile) on a soft red radial glow
6. **A Home for AI Creativity** — split section: copy left, collage of placeholder AI-art cards right (generated)
7. **Waitlist** — large centered email capture; on submit shows polished success state (client-only, no backend)
8. **FAQ** — accordion with the 5 questions
9. **Footer** — wordmark + tagline, nav columns (Product / Company / Social), copyright

### Placeholder AI artwork
Generate 6–8 original abstract AI-art placeholders with `imagegen` (abstract bloom/floral/light-form compositions in red/cream/charcoal palette — no recognizable styles or IP). Used in the phone mockup feed, the "Home for AI Creativity" collage, and the product preview screens. Easy to swap later.

### Technical notes
- New route content lives in `src/routes/index.tsx` (replaces placeholder)
- New components under `src/components/vehloom/`: `Nav`, `Hero`, `FloatingBadges`, `PhoneMockup`, `TrustedBadges`, `Features`, `ProductPreview`, `CommunitySection`, `Waitlist`, `FAQ`, `Footer`
- Add `framer-motion` via bun
- Update `__root.tsx` head: Inter `<link>`, Vehloom title/description/OG tags
- All colors via semantic tokens — no hardcoded hex in components
- Fully responsive: hero floating badges collapse to a simple row on mobile, feature grid stacks, phone mockup scales down

### Out of scope
- No backend / no real waitlist storage (UI only, as requested)
- No auth, no Lovable Cloud
