interface BrandMarkProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

// Brand mark — small circle / large diamond / large diamond / small circle
// arranged in a 2x2 grid (per 2nd Break brand guidelines).
export function BrandMark({ className, size = 24, color = "currentColor", animated = false }: BrandMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ color }}
    >
      <circle cx="30" cy="30" r="11" fill="currentColor" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "30px 30px", animationDelay: "0s" }} />
      <polygon points="70,14 86,30 70,46 54,30" fill="currentColor" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "70px 30px", animationDelay: "0.3s" }} />
      <polygon points="30,54 46,70 30,86 14,70" fill="currentColor" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "30px 70px", animationDelay: "0.6s" }} />
      <circle cx="70" cy="70" r="11" fill="currentColor" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "70px 70px", animationDelay: "0.9s" }} />
    </svg>
  );
}


