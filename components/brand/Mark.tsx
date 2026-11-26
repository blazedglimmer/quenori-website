import { MARK } from "@/lib/brand/glyphs";

/** Compact brand mark — the crowned q, drawn for small sizes. Works from 16px up. */
export function Mark({
  className,
  title = "Quenori",
  tile = false,
}: {
  className?: string;
  title?: string;
  /** Render on a solid ink tile (app icon / avatar usage). */
  tile?: boolean;
}) {
  return (
    <svg
      viewBox={MARK.viewBox}
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {tile && (
        <rect x="-36" y="-52" width="190" height="190" rx="30" fill="var(--color-ink)" stroke="none" />
      )}
      <g stroke={tile ? "var(--color-paper)" : undefined}>
        {MARK.strokes.map((s, i) => (
          <path key={i} d={s.d} strokeWidth={s.weight === "growth" ? MARK.growth : MARK.structure} />
        ))}
      </g>
    </svg>
  );
}
