import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/products";
import { SectionHeading } from "./SectionHeading";

const W = 1000;
const H = 580;
const GROUND = 340;
const FORK = 250;
const CROWN = 86;

const roots = [
  { label: "Careful engineering", x: 230, y: 520, d: "M500 340C492 400 420 440 330 470C290 484 255 500 230 520" },
  { label: "Thoughtful design", x: 500, y: 552, d: "M500 340C506 410 494 480 500 552" },
  { label: "Long-term thinking", x: 770, y: 520, d: "M500 340C510 400 580 440 670 470C710 484 745 500 770 520" },
];

const rootlets = [
  "M386 452C372 470 368 488 372 506",
  "M498 450C478 468 468 486 466 500",
  "M616 452C632 468 640 486 638 504",
];

function crown() {
  // Live products + one open branch for what comes next.
  const nodes = [
    ...products.map((p) => ({ key: p.slug, label: p.name, live: p.status === "live", future: false })),
    { key: "next", label: "Next idea", live: false, future: true },
  ];
  const n = nodes.length;
  const span = Math.min(820, 190 * (n - 1));
  return nodes.map((node, i) => {
    const x = n === 1 ? W / 2 : W / 2 - span / 2 + (span * i) / (n - 1);
    const lift = Math.abs(x - W / 2) / (span / 2 || 1);
    const y = CROWN + lift * 26;
    const d = `M500 ${FORK}C500 ${FORK - 70} ${x} ${y + 110} ${x} ${y}`;
    return { ...node, x, y, d };
  });
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function Philosophy() {
  const nodes = crown();

  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-title"
      className="scroll-mt-16 border-t border-line bg-bark"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <Reveal>
          <SectionHeading
            align="center"
            label="Philosophy"
            id="philosophy-title"
            title={
              <>
                Different ideas. Different products. <br />
                <em className="text-lichen">One vision.</em>
              </>
            }
            aside={
              <p>
                Quenori is the ground everything grows from. Every product above the surface is
                independent; below it, they share the same roots.
              </p>
            }
          />
        </Reveal>

        <Reveal className="relative mx-auto mt-16 max-w-5xl sm:mt-24">
          <figure>
            <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden
                fill="none"
                strokeLinecap="round"
              >
                {/* Ground */}
                <line x1="40" x2="960" y1={GROUND} y2={GROUND} stroke="var(--color-line)" strokeWidth="1" />
                <line
                  x1="40"
                  x2="960"
                  y1={GROUND + 7}
                  y2={GROUND + 7}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                  strokeDasharray="2 7"
                />

                {/* Roots */}
                <g stroke="var(--color-stone)">
                  {roots.map((r, i) => (
                    <path key={r.label} className="grow-line" d={r.d} pathLength={1} strokeWidth="2.2" style={{ "--d": 600 + i * 120 } as React.CSSProperties} />
                  ))}
                  {rootlets.map((d, i) => (
                    <path key={i} className="grow-line" d={d} pathLength={1} strokeWidth="1.3" style={{ "--d": 1100 + i * 100 } as React.CSSProperties} />
                  ))}
                </g>

                {/* Trunk + branches */}
                <g stroke="var(--color-paper)">
                  <path className="grow-line" d={`M500 ${GROUND}L500 ${FORK}`} pathLength={1} strokeWidth="3.2" style={{ "--d": 0 } as React.CSSProperties} />
                  {nodes.map((n, i) => (
                    <path
                      key={n.key}
                      className={n.future ? "grow-node" : "grow-line"}
                      d={n.d}
                      pathLength={1}
                      strokeWidth={n.future ? 1.4 : 2}
                      strokeDasharray={n.future ? "4 7" : undefined}
                      stroke={n.future ? "var(--color-stone)" : undefined}
                      style={{ "--d": 350 + i * 140 } as React.CSSProperties}
                    />
                  ))}
                </g>

                {/* Nodes */}
                {nodes.map((n, i) => (
                  <g key={n.key} className="grow-node" style={{ "--d": 500 + i * 140 } as React.CSSProperties}>
                    {n.future ? (
                      <circle cx={n.x} cy={n.y} r="6" stroke="var(--color-stone)" strokeWidth="1.4" />
                    ) : n.live ? (
                      <>
                        <circle cx={n.x} cy={n.y} r="15" stroke="var(--color-paper)" strokeOpacity="0.3" strokeWidth="1" />
                        <circle cx={n.x} cy={n.y} r="7" fill="var(--color-paper)" />
                      </>
                    ) : (
                      <circle cx={n.x} cy={n.y} r="6.5" fill="var(--color-bark)" stroke="var(--color-mist)" strokeWidth="1.6" />
                    )}
                  </g>
                ))}
                <circle className="grow-node" cx="500" cy={GROUND} r="5" fill="var(--color-lichen)" />
              </svg>

              {/* Labels in HTML so they stay legible at every size. */}
              {nodes.map((n) => (
                <span
                  key={n.key}
                  className={`absolute w-16 -translate-x-1/2 -translate-y-full pb-3 text-center text-xs leading-tight sm:w-28 sm:pb-4 sm:text-sm ${n.future ? "text-stone" : n.live ? "text-paper" : "text-mist"}`}
                  style={{ left: pct(n.x, W), top: pct(n.y, H) }}
                >
                  {n.label}
                </span>
              ))}
              <span
                className="eyebrow absolute -translate-y-full pb-2 text-[0.6875rem] text-lichen"
                style={{ left: pct(508, W), top: pct(GROUND, H) }}
              >
                Quenori
              </span>
              {roots.map((r) => (
                <span
                  key={r.label}
                  className="absolute w-20 -translate-x-1/2 pt-3 text-center text-xs leading-tight text-stone sm:w-auto sm:text-sm sm:whitespace-nowrap"
                  style={{ left: pct(r.x, W), top: pct(r.y, H) }}
                >
                  {r.label}
                </span>
              ))}
            </div>
            <figcaption className="sr-only">
              Diagram: Quenori as shared ground. Above it, branches lead to{" "}
              {products.map((p) => p.name).join(", ")} and a branch left open for the next idea.
              Below it, roots named careful engineering, thoughtful design and long-term thinking.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-5xl gap-12 border-t border-line pt-12 sm:mt-24 md:grid-cols-3 md:gap-10">
          {[
            {
              title: "Different ideas.",
              body: "Every product starts from its own question. We follow the idea where it leads instead of fitting it into a template.",
            },
            {
              title: "Different products.",
              body: "Each one has its own name, identity and address. It can grow at its own pace, for the people it was made for.",
            },
            {
              title: "One vision.",
              body: "Underneath, the same roots: careful engineering, thoughtful design and the patience to keep improving things over years.",
            },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <h3 className="font-display text-2xl font-light">{p.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-mist">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
