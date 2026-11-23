import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Glyph } from "@/components/brand/Glyph";
import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { Reveal } from "@/components/ui/Reveal";
import { glyphs, STROKE } from "@/lib/brand/glyphs";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "The Quenori identity: seven nature-grown letterforms, the logo suite, colour, typography and usage.",
  alternates: { canonical: "/brand" },
};

const colors = [
  { name: "Ink", hex: "#12130F", role: "Primary background. Never pure black.", cls: "bg-ink border border-line" },
  { name: "Bark", hex: "#191A15", role: "Raised surfaces and alternate sections.", cls: "bg-bark border border-line" },
  { name: "Line", hex: "#2A2C24", role: "Hairlines, rules and grids.", cls: "bg-line" },
  { name: "Stone", hex: "#8F8C80", role: "Labels and tertiary text.", cls: "bg-stone" },
  { name: "Mist", hex: "#C4C0B3", role: "Body text on Ink.", cls: "bg-mist" },
  { name: "Paper", hex: "#EEEBE3", role: "Wordmark on dark; light sections.", cls: "bg-paper" },
  { name: "Lichen", hex: "#B8C98A", role: "The single accent on dark — the leaf.", cls: "bg-lichen" },
  { name: "Moss", hex: "#4F6B2F", role: "The accent on Paper.", cls: "bg-moss" },
];

const downloads = [
  ["Wordmark — dark", "/brand/quenori-wordmark-dark.svg"],
  ["Wordmark — light", "/brand/quenori-wordmark-light.svg"],
  ["Simplified — dark", "/brand/quenori-wordmark-simplified-dark.svg"],
  ["Simplified — light", "/brand/quenori-wordmark-simplified-light.svg"],
  ["Monochrome — black", "/brand/quenori-wordmark-mono-black.svg"],
  ["Monochrome — white", "/brand/quenori-wordmark-mono-white.svg"],
  ["Mark — ink tile", "/brand/quenori-mark.svg"],
  ["Mark — paper tile", "/brand/quenori-mark-light.svg"],
  ["Mark — monochrome", "/brand/quenori-mark-mono-black.svg"],
];

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
      {/* Intro */}
      <header className="grid gap-10 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow text-stone">Brand guidelines</p>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6.5rem)] font-light leading-[0.95] tracking-[-0.02em]">
            Seven letters, <em className="text-lichen">grown</em> rather than set.
          </h1>
        </div>
        <p className="self-end text-lg leading-relaxed text-mist lg:col-span-4">
          The Quenori identity is built on one idea: nature isn&apos;t placed next to the letters, it
          grows out of them. This page documents how the wordmark is constructed and how to use it.
        </p>
      </header>

      {/* 01 Origin */}
      <Section index="01" title="From sketch to system">
        <div className="grid gap-10 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <Image
              src="/brand/original-sketch.png"
              alt="The original hand-drawn Quenori sketch: a tree as the Q, a snail as the E, a bird near the R and a leaf above the I, with notes under each letter."
              width={1772}
              height={1114}
              className="h-auto w-full border border-line"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <figcaption className="eyebrow mt-3 text-[0.6875rem] text-stone">
              The founding sketch
            </figcaption>
          </figure>
          <div className="space-y-5 leading-relaxed text-mist lg:col-span-5">
            <p>
              The sketch set the direction: a tree for the q, a snail for the e, a bird for the r, a
              leaf and branch for the i, and space for nature in the u, n and o. It also set the
              personality: lowercase, hand-drawn, a little irregular.
            </p>
            <p>
              Three directions were considered. <strong className="font-medium text-paper">Illustrative</strong>{" "}
              drew each motif in full beside its letter. It was charming but read as a children&apos;s
              book. <strong className="font-medium text-paper">Solid stencil</strong> carved the
              motifs out of heavy filled letters. It was strong, but the nature turned into
              decoration. <strong className="font-medium text-paper">Monoline growth</strong>, the
              chosen direction, keeps each letter a single confident stroke and lets one fine detail
              grow out of it.
            </p>
            <p>
              The result keeps the sketch&apos;s handmade character through deliberate
              irregularities: a canopy with a cleft, a slightly bent branch, an eccentric ring. Every
              letter still reads first as a letter.
            </p>
          </div>
        </div>
      </Section>

      {/* 02 Construction */}
      <Section index="02" title="Construction">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 leading-relaxed text-mist lg:col-span-4">
            <p>
              All seven letters share one grid: an x-height of 100 units, an ascender zone the canopy,
              wing and leaf may reach into, and a descender used only by the roots of the q.
            </p>
            <p>The system has exactly two weights:</p>
            <dl className="space-y-4 border-t border-line pt-4">
              <div>
                <dt className="eyebrow text-paper">Structure · {STROKE.structure}u</dt>
                <dd className="mt-1 text-sm">The letter itself. It carries legibility.</dd>
              </div>
              <div>
                <dt className="eyebrow text-paper">Growth · {STROKE.growth}u</dt>
                <dd className="mt-1 text-sm">
                  The natural detail that grows out of the structure: roots, tendril, shell, rings,
                  wing.
                </dd>
              </div>
            </dl>
            <p>
              Rule: one structure gesture, one growth detail per letter. Nothing floats beside a
              letter.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-px border border-line bg-line sm:grid-cols-7 lg:col-span-8">
            {glyphs.map((g) => (
              <div key={g.char} className="bg-ink p-2">
                <Glyph char={g.char} guides className="h-auto w-full text-paper" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 03 Letters */}
      <Section index="03" title="The letterforms">
        <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {glyphs.map((g, i) => (
            <Reveal as="li" key={g.char} delay={i * 60} className="flex flex-col bg-ink p-6 sm:p-8">
              <Glyph char={g.char} className="mx-auto h-56 w-auto text-paper" />
              <p className="eyebrow mt-6 text-stone">
                <span className="normal-case">{g.char}</span> — {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-2xl font-light">{g.nature}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{g.note}</p>
            </Reveal>
          ))}
          <li className="hidden flex-col justify-end bg-bark p-8 lg:flex">
            <p className="font-display text-2xl font-light leading-snug text-mist">
              Each letter can stand alone as an illustration, in product, editorial and
              environmental use.
            </p>
          </li>
        </ol>
      </Section>

      {/* 04 Logo suite */}
      <Section index="04" title="Logo suite">
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          <Tile label="Primary wordmark" note="Full detail, Lichen leaf. Use at 160px wide and above." className="bg-ink md:col-span-2">
            <Wordmark className="mx-auto h-auto w-full max-w-3xl text-paper" />
          </Tile>
          <Tile label="Primary on Paper" note="Leaf switches to Moss." className="on-paper">
            <Wordmark className="h-auto w-full text-ink" />
          </Tile>
          <Tile label="Simplified wordmark" note="Structure only, heavier stroke. For navigation and sizes below 160px." className="bg-bark">
            <Wordmark variant="simplified" className="h-auto w-full text-paper" />
          </Tile>
          <Tile label="Monochrome — black" note="Single colour, leaf included. Print, embossing, single-ink." className="bg-white text-black">
            <Wordmark accentLeaf={false} className="h-auto w-full" />
          </Tile>
          <Tile label="Monochrome — white" note="Reversed out of photography or colour fields." className="bg-black text-white">
            <Wordmark accentLeaf={false} className="h-auto w-full" />
          </Tile>
          <Tile
            label="Compact mark"
            note="The q as a tree: canopy, trunk and roots. Favicon, app icon, avatar."
            className="bg-bark md:col-span-2"
          >
            <div className="flex flex-wrap items-end justify-center gap-8 sm:gap-12">
              <Mark tile className="size-40" />
              <Mark className="size-28 text-paper" />
              <Mark tile className="size-16" />
              <Mark tile className="size-8" />
              <Mark tile className="size-4" />
              <div className="on-paper p-4">
                <Mark className="size-16 text-ink" />
              </div>
            </div>
          </Tile>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <h3 className="eyebrow text-stone lg:col-span-3">Downloads (SVG)</h3>
          <ul className="grid gap-x-8 gap-y-3 text-mist sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
            {downloads.map(([label, href]) => (
              <li key={href}>
                <a href={href} download className="group inline-flex items-center gap-2 hover:text-paper">
                  <span aria-hidden className="text-stone group-hover:text-lichen">↓</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 05 Explorations */}
      <Section index="05" title="Weight study">
        <p className="max-w-2xl leading-relaxed text-mist">
          The same letterforms drawn at three structure weights. Too light and the growth details
          vanish below 24px. Too heavy and the forms turn soft and toy-like. The middle weight is
          the one that feels engineered and still handmade.
        </p>
        <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-3">
          {[
            { scale: 0.6, label: "Hairline", verdict: "Rejected — fragile at small sizes" },
            { scale: 1, label: "Regular", verdict: "Chosen" },
            { scale: 1.5, label: "Heavy", verdict: "Rejected — reads as playful" },
          ].map((w) => (
            <div key={w.label} className="bg-ink p-8">
              <Wordmark strokeScale={w.scale} className="h-auto w-full text-paper" />
              <div className="mt-8 flex items-baseline justify-between">
                <span className="font-display text-xl font-light">{w.label}</span>
                <span className={`eyebrow text-[0.6875rem] ${w.verdict === "Chosen" ? "text-lichen" : "text-stone"}`}>
                  {w.verdict}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 06 Colour */}
      <Section index="06" title="Colour">
        <p className="max-w-2xl leading-relaxed text-mist">
          A restrained palette of near-black and warm paper, with a single living accent. Colour is
          spent sparingly, mostly on the leaf. Products carry their own muted earth tones, used only
          inside their own identities.
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
          {colors.map((c) => (
            <li key={c.name} className="bg-ink p-5">
              <div className={`aspect-[4/3] w-full ${c.cls}`} />
              <p className="mt-4 font-display text-lg font-light">{c.name}</p>
              <p className="eyebrow mt-1 text-[0.6875rem] text-stone">{c.hex}</p>
              <p className="mt-2 text-sm leading-snug text-mist">{c.role}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-px grid grid-cols-2 gap-px border border-t-0 border-line bg-line sm:grid-cols-4">
          {products.map((p) => (
            <li key={p.slug} className="flex items-center gap-4 bg-ink p-5">
              <span className="size-8 shrink-0" style={{ background: p.accent }} />
              <span>
                <span className="block text-sm">{p.name}</span>
                <span className="eyebrow text-[0.6875rem] text-stone">{p.accent}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 07 Type */}
      <Section index="07" title="Typography">
        <div className="grid gap-px border border-line bg-line lg:grid-cols-3">
          <div className="bg-ink p-8">
            <p className="eyebrow text-stone">Display — Fraunces</p>
            <p className="mt-6 font-display text-6xl font-light leading-none">
              Grow <em>slowly.</em>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-mist">
              A soft, high-contrast serif with optical sizing. Set light, with the wonky italic kept
              for emphasis. Headlines and statements only.
            </p>
          </div>
          <div className="bg-ink p-8">
            <p className="eyebrow text-stone">Text — Geist</p>
            <p className="mt-6 text-3xl leading-tight">Precise, quiet, technical.</p>
            <p className="mt-6 text-sm leading-relaxed text-mist">
              The engineering voice. Body copy, interface and navigation. Regular and medium
              weights only.
            </p>
          </div>
          <div className="bg-ink p-8">
            <p className="eyebrow text-stone">Labels — Geist Mono</p>
            <p className="eyebrow mt-6 text-base text-paper">01 — Products · Live</p>
            <p className="mt-6 text-sm leading-relaxed text-mist">
              Uppercase, tracked +8%. Indexes, statuses, metadata and captions. The field-notes
              layer, like the annotations in the original sketch.
            </p>
          </div>
        </div>
      </Section>

      {/* 08 Usage */}
      <Section index="08" title="Usage">
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          <Rule title="Clear space">
            Keep at least one x-height (the height of the u) clear on every side of the wordmark,
            measured from the canopy, wing, leaf and roots.
          </Rule>
          <Rule title="Minimum size">
            Primary: 160px / 40mm wide. Simplified: 72px / 18mm wide. Mark: 16px.
          </Rule>
          <Rule title="Backgrounds">
            Paper on Ink, or Ink on Paper. On photography, use the monochrome versions on calm
            areas only.
          </Rule>
          <Rule title="Don’t">
            Re-draw, re-space or swap letters, add drop shadows or gradients, or colour individual
            letters.
          </Rule>
          <Rule title="Don’t">
            Set &ldquo;Quenori&rdquo; in a typeface as a logo. In running text, write Quenori with a
            capital Q.
          </Rule>
          <Rule title="Motion">
            The wordmark may draw itself on, stroke by stroke, and the leaf may sway. Nothing else
            moves. Always honour reduced-motion settings.
          </Rule>
        </div>
      </Section>
    </div>
  );
}

function Section({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-16 sm:py-24" aria-labelledby={`brand-${index}`}>
      <div className="mb-10 flex items-baseline gap-4 sm:mb-14">
        <span className="eyebrow text-stone">{index}</span>
        <h2 id={`brand-${index}`} className="font-display text-3xl font-light sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Tile({
  label,
  note,
  className,
  children,
}: {
  label: string;
  note: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={`flex flex-col justify-between gap-10 p-8 sm:p-12 ${className ?? ""}`}>
      <div className="flex flex-1 items-center">{children}</div>
      <figcaption className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="eyebrow text-[0.6875rem]">{label}</span>
        <span className="text-sm opacity-60">{note}</span>
      </figcaption>
    </figure>
  );
}

function Rule({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-ink p-8">
      <h3 className="eyebrow text-stone">{title}</h3>
      <p className="mt-4 leading-relaxed text-mist">{children}</p>
    </div>
  );
}
