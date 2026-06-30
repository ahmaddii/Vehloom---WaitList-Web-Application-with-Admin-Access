import { motion } from "framer-motion";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";

type Bubble = {
  src: string;
  alt: string;
  size: string; // tailwind sizing
  ring: string; // ring color class
  className: string; // positioning
  delay?: number;
};

const bubbles: Bubble[] = [
  {
    src: art1,
    alt: "AI portrait illustration",
    size: "h-16 w-16 sm:h-20 sm:w-20",
    ring: "ring-primary/40",
    className: "left-[3%] top-[14%] sm:left-[7%] sm:top-[18%]",
    delay: 0.1,
  },
  {
    src: art2,
    alt: "Abstract bloom illustration",
    size: "h-14 w-14 sm:h-16 sm:w-16",
    ring: "ring-[oklch(0.92_0.04_70)]/40",
    className: "left-[7%] top-[52%] sm:left-[11%] sm:top-[55%]",
    delay: 0.2,
  },
  {
    src: art3,
    alt: "Surreal AI artwork",
    size: "h-16 w-16 sm:h-20 sm:w-20",
    ring: "ring-[oklch(0.78_0.12_20)]/40",
    className: "left-[2%] bottom-[14%] hidden md:flex",
    delay: 0.3,
  },
  {
    src: art4,
    alt: "Glowing creator illustration",
    size: "h-16 w-16 sm:h-20 sm:w-20",
    ring: "ring-[oklch(0.78_0.12_20)]/40",
    className: "right-[4%] top-[14%] sm:right-[7%] sm:top-[16%]",
    delay: 0.15,
  },
  {
    src: art5,
    alt: "Dreamscape AI piece",
    size: "h-14 w-14 sm:h-16 sm:w-16",
    ring: "ring-[oklch(0.92_0.04_70)]/40",
    className: "right-[7%] top-[50%] sm:right-[11%] sm:top-[53%]",
    delay: 0.25,
  },
  {
    src: art6,
    alt: "Vibrant creative illustration",
    size: "h-16 w-16 sm:h-20 sm:w-20",
    ring: "ring-primary/40",
    className: "right-[2%] bottom-[14%] hidden md:flex",
    delay: 0.35,
  },
];

export function FloatingBadges() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block">
      {/* curved connector lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="line-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FE5A4E" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF756B" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M 80 180 Q 220 360 130 520 T 80 720"
          stroke="url(#line-g)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 1120 160 Q 980 320 1080 480 T 1120 720"
          stroke="url(#line-g)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 60 540 Q 300 620 600 600 T 1140 540"
          stroke="url(#line-g)"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </svg>

      {bubbles.map((b) => (
        <motion.div
          key={b.alt}
          className={`absolute ${b.className} pointer-events-auto`}
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: b.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5 + (b.delay ?? 0) * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`overflow-hidden rounded-full shadow-glow ring-2 ${b.ring} ${b.size} bg-surface`}
          >
            <img
              src={b.src}
              alt={b.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
