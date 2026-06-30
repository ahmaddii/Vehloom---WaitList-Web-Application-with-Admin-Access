import { Heart, MessageCircle, Search, Sparkles, Bookmark, Home, Compass, PlusSquare, User } from "lucide-react";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art4 from "@/assets/art-4.jpg";

export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* device */}
      <div className="relative mx-auto w-[280px] sm:w-[320px] rounded-[44px] border border-white/10 bg-[oklch(0.13_0.01_70)] p-2 shadow-soft">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black/80" />
        <div className="relative overflow-hidden rounded-[36px] bg-background">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[11px] font-medium text-foreground/80">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Vehloom
            </span>
          </div>

          {/* header */}
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary-glow" />
              <div>
                <div className="text-[11px] font-semibold leading-tight">For you</div>
                <div className="text-[9px] text-muted-foreground">curated today</div>
              </div>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5">
              <Search className="h-3.5 w-3.5 text-foreground/70" />
            </div>
          </div>

          {/* feed card */}
          <div className="px-4 pt-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card">
              <img
                src={art1}
                alt=""
                width={768}
                height={1024}
                className="h-44 w-full object-cover"
              />
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-3.5 w-3.5 text-primary" fill="currentColor" />
                  <span className="text-[10px] text-muted-foreground">12.4k</span>
                  <MessageCircle className="ml-1 h-3.5 w-3.5 text-foreground/60" />
                  <span className="text-[10px] text-muted-foreground">312</span>
                </div>
                <Bookmark className="h-3.5 w-3.5 text-foreground/60" />
              </div>
            </div>
          </div>

          {/* grid */}
          <div className="grid grid-cols-2 gap-2 px-4 pt-3">
            <img src={art2} alt="" width={384} height={512} className="h-24 w-full rounded-xl object-cover" />
            <img src={art4} alt="" width={384} height={512} className="h-24 w-full rounded-xl object-cover" />
          </div>

          {/* tab bar */}
          <div className="mt-4 flex items-center justify-between border-t border-white/5 px-6 py-3">
            <Home className="h-4 w-4 text-foreground" />
            <Compass className="h-4 w-4 text-foreground/50" />
            <div className="-mt-5 grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
              <PlusSquare className="h-4 w-4" />
            </div>
            <Sparkles className="h-4 w-4 text-foreground/50" />
            <User className="h-4 w-4 text-foreground/50" />
          </div>
        </div>
      </div>

      {/* glow */}
      <div className="pointer-events-none absolute inset-x-10 -bottom-10 h-24 rounded-full bg-primary/40 blur-3xl" />
    </div>
  );
}
