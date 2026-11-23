import type { Product } from "@/lib/products";

/**
 * Generated product identity. Each product grows its own branching form
 * from a seed derived from its slug, drawn in the shared Quenori stroke
 * language and coloured with the product's accent. New products get a
 * unique thumbnail without any design work.
 */

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Segment = { d: string; depth: number };
type Tip = { x: number; y: number };

const r1 = (n: number) => Math.round(n * 10) / 10;

function growTree(seed: string) {
  const rand = rng(hash(seed));
  const segments: Segment[] = [];
  const tips: Tip[] = [];
  const maxDepth = 4;

  function branch(x: number, y: number, angle: number, length: number, depth: number) {
    const rad = (angle * Math.PI) / 180;
    const x2 = x + Math.sin(rad) * length;
    const y2 = y - Math.cos(rad) * length;
    // A slight bend so branches never look ruled.
    const bend = (rand() - 0.5) * length * 0.35;
    const cx = (x + x2) / 2 + Math.cos(rad) * bend;
    const cy = (y + y2) / 2 + Math.sin(rad) * bend;
    segments.push({ d: `M${r1(x)} ${r1(y)}Q${r1(cx)} ${r1(cy)} ${r1(x2)} ${r1(y2)}`, depth });

    if (depth === maxDepth) {
      tips.push({ x: x2, y: y2 });
      return;
    }
    const children = depth > 0 && rand() > 0.72 ? 3 : 2;
    const spread = 22 + rand() * 18;
    for (let i = 0; i < children; i++) {
      const t = i / (children - 1) - 0.5;
      const a = angle + t * spread * 2 + (rand() - 0.5) * 12;
      branch(x2, y2, a, length * (0.66 + rand() * 0.14), depth + 1);
    }
  }

  branch(80 + (rand() - 0.5) * 10, 148, (rand() - 0.5) * 10, 38 + rand() * 8, 0);
  return { segments, tips };
}

const WIDTHS = [3.4, 2.6, 1.9, 1.4, 1.1];

export function ProductThumb({ product, className }: { product: Product; className?: string }) {
  const { segments, tips } = growTree(product.slug);
  const initial = product.name.charAt(0);

  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      role="img"
      aria-label={`${product.name} identity`}
    >
      <rect width="160" height="160" fill="var(--color-bark)" />
      <line x1="16" x2="144" y1="148" y2="148" stroke="var(--color-line)" strokeWidth="1" />
      <g fill="none" stroke={product.accent} strokeLinecap="round">
        {segments.map((s, i) => (
          <path
            key={i}
            d={s.d}
            strokeWidth={WIDTHS[s.depth]}
            opacity={s.depth >= 3 ? 0.85 : 1}
            pathLength={1}
            className={s.depth >= 3 ? "thumb-twig" : undefined}
          />
        ))}
      </g>
      <g fill={product.accent}>
        {tips.map((t, i) => (
          <circle key={i} cx={r1(t.x)} cy={r1(t.y)} r={i % 3 === 0 ? 2.2 : 1.4} opacity={0.9} />
        ))}
      </g>
      <text
        x="14"
        y="34"
        fill="var(--color-paper)"
        fontFamily="var(--font-display)"
        fontStyle="italic"
        fontSize="26"
      >
        {initial}
      </text>
    </svg>
  );
}
