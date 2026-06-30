import ventlumIcon from "@/assets/app-icon/Ventlum.png";

export function VehloomMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img 
      src={ventlumIcon} 
      alt="Ventlum Logo" 
      className={`${className} object-contain`} 
      aria-hidden="true" 
    />
  );
}

export function VehloomWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <VehloomMark className="h-8 w-8" />
      <span className="text-[17px] font-bold tracking-tight text-foreground">
        Vehloom
      </span>
    </div>
  );
}
