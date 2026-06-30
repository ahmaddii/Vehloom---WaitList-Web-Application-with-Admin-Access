export function LaserDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      {/* Static faint base line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent" />

      {/* Traveling laser beam */}
      <div
        className="animate-laser absolute -top-[2px] h-[5px] w-[22%]"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(254,90,78,0.5) 20%, #FE5A4E 45%, #FFBBB5 50%, #FE5A4E 55%, rgba(254,90,78,0.5) 80%, transparent)",
          filter: "blur(1px)",
        }}
      />

      {/* Wide glow that follows the beam */}
      <div
        className="animate-laser absolute -top-[6px] h-[13px] w-[22%]"
        style={{
          animationDelay: "0s",
          background:
            "linear-gradient(to right, transparent, rgba(254,90,78,0.15) 30%, rgba(254,90,78,0.25) 50%, rgba(254,90,78,0.15) 70%, transparent)",
          filter: "blur(5px)",
        }}
      />
    </div>
  );
}
