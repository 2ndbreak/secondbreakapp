interface BrandMarkProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

// 2x2 mark — circle / diamond / diamond / circle arranged in a square.
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
        {/* top-left circle */}
        <circle cx="16" cy="16" r="14" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "16px 16px", animationDelay: "0s" }} />
        {/* top-right diamond */}
        <rect x="34" y="-2" width="28" height="28" transform="rotate(45 48 16)" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "48px 16px", animationDelay: "0.3s" }} />
        {/* bottom-left diamond */}
        <rect x="2" y="34" width="28" height="28" transform="rotate(45 16 48)" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "16px 48px", animationDelay: "0.6s" }} />
        {/* bottom-right circle */}
        <circle cx="48" cy="48" r="14" className={animated ? "mark-piece-drift" : ""} style={{ transformOrigin: "48px 48px", animationDelay: "0.9s" }} />
      </g>
    </svg>
  );
}
