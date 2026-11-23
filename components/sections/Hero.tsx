import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { layoutGlyphs, wordmarkBounds } from "@/lib/brand/glyphs";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

/** Letter annotations, positioned as a percentage of the wordmark width. */
function annotations() {
  const b = wordmarkBounds();
  return layoutGlyphs().map(({ glyph, x }) => ({
    char: glyph.char,
    nature: glyph.nature,
    left: ((x + glyph.advance * 0.45 - b.left) / b.width) * 100,
  }));
}

export function Hero() {
  const live = products.filter((p) => p.status === "live").length;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
        <div className="eyebrow flex items-center justify-between text-stone">
          <span>Independent product studio</span>
          <span className="hidden sm:inline">
            {products.length} products · {live} live
          </span>
        </div>

        <div className="relative mt-10 sm:mt-14">
          <Wordmark animate className="h-auto w-full text-paper" title="Quenori" />

          {/* Sketch-style annotations: what each letter grows from. */}
          <ol
            aria-label="The letterforms"
            className="relative mt-2 hidden h-24 border-t border-line md:block"
          >
            {annotations().map((a, i) => (
              <li
                key={a.char}
                className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
                style={{ left: `${a.left}%` }}
              >
                <span aria-hidden className={`block w-px bg-line ${i % 2 ? "h-10" : "h-4"}`} />
                <span className="eyebrow mt-2 whitespace-nowrap text-[0.6875rem] text-stone">
                  <span className="normal-case text-mist">{a.char}</span> — {a.nature}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-10 pb-20 pt-12 sm:pb-28 md:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-36">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.75rem,7.4vw,7rem)] font-light leading-[0.94] tracking-[-0.02em] lg:col-span-7"
          >
            Ideas grow <br className="hidden sm:block" />
            into <em className="text-lichen">products.</em>
          </h1>
          <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-lg leading-relaxed text-mist">{site.description}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="#products"
                className="group inline-flex items-center gap-3 bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-lichen"
              >
                Explore products
                <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
                  ↓
                </span>
              </Link>
              <Link
                href="#philosophy"
                className="text-sm text-mist underline decoration-line underline-offset-[6px] transition-colors hover:text-paper hover:decoration-lichen"
              >
                Our philosophy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
