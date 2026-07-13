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
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <g fill={color}>
        {/* top-left small circle */}
        <circle cx="14" cy="14" r="8" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "14px 14px", animationDelay: "0s" }} />
        {/* top-right large diamond */}
        <rect x="32" y="0" width="28" height="28" transform="rotate(45 46 14)" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "46px 14px", animationDelay: "0.3s" }} />
        {/* bottom-left large diamond */}
        <rect x="4" y="36" width="28" height="28" transform="rotate(45 18 50)" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "18px 50px", animationDelay: "0.6s" }} />
        {/* bottom-right small circle */}
        <circle cx="50" cy="50" r="8" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "50px 50px", animationDelay: "0.9s" }} />
      </g>
    </svg>
  );
}

