interface BrandMarkProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

// Two circles + two diamonds — a reinterpreted division sign.
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
        <circle cx="32" cy="10" r="6" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "32px 10px", animationDelay: "0s" }} />
        <rect x="8" y="24" width="14" height="14" transform="rotate(45 15 31)" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "15px 31px", animationDelay: "0.3s" }} />
        <rect x="42" y="24" width="14" height="14" transform="rotate(45 49 31)" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "49px 31px", animationDelay: "0.6s" }} />
        <circle cx="32" cy="54" r="6" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "32px 54px", animationDelay: "0.9s" }} />
      </g>
    </svg>
  );
}
