import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import {
  liveProducts,
  productHost,
  statusLabel,
  upcomingProducts,
  type Product,
} from "@/lib/products";
import { SectionHeading } from "./SectionHeading";

/** CSS font stacks for product display faces loaded in app/layout.tsx. */
const productFonts = {
  newsreader: "var(--font-newsreader), Georgia, serif",
} as const;

export function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <Reveal>
          <SectionHeading
            label="Products"
            id="products-title"
            title={
              <>
                Independent products, each with <em>a life of its own.</em>
              </>
            }
            aside={
              <p>
                Every product has its own name, identity and home. Quenori is where they start; what
                they become is up to the people who use them.
              </p>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-10 sm:mt-20">
          {liveProducts.map((product) => (
            <Reveal key={product.slug}>
              <FeaturedProduct product={product} />
            </Reveal>
          ))}
        </div>

        {upcomingProducts.length > 0 && (
          <Reveal className="mt-16 sm:mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
              <h3 className="eyebrow text-mist">In development</h3>
              <p className="text-sm text-stone">Details will be published as each one launches.</p>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
              {upcomingProducts.map((p) => (
                <UpcomingProduct key={p.slug} product={p} />
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function FeaturedProduct({ product }: { product: Product }) {
  const identity = product.identity;
  const titleId = `product-${product.slug}`;

  return (
    <article
      aria-labelledby={titleId}
      className="group grid overflow-hidden border border-line lg:grid-cols-12"
    >
      {/* The product, in its own identity. Quenori provides only the frame. */}
      {identity ? (
        <div
          className="relative flex flex-col overflow-hidden lg:col-span-8"
          style={{ background: identity.background, color: identity.foreground }}
        >
          <div className="flex items-center gap-3 px-6 pt-6 sm:px-10 sm:pt-9">
            <Image src={identity.mark} alt="" width={28} height={28} className="size-7" unoptimized />
            <span
              className="text-[1.375rem] leading-none font-medium"
              style={{ fontFamily: identity.displayFont ? productFonts[identity.displayFont] : undefined }}
            >
              {product.name}
            </span>
          </div>
          {product.tagline && (
            <p
              className="mt-8 px-6 text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.02em] text-balance sm:px-10"
              style={{ fontFamily: identity.displayFont ? productFonts[identity.displayFont] : undefined }}
            >
              {product.tagline}
            </p>
          )}
          {identity.preview && (
            <div
              className="mt-8 ml-6 flex-1 overflow-hidden rounded-tl-xl border-t border-l sm:mt-10 sm:ml-10"
              style={{ borderColor: `color-mix(in srgb, ${identity.foreground} 12%, transparent)` }}
            >
              <Image
                src={identity.preview.src}
                alt={identity.preview.alt}
                width={identity.preview.width}
                height={identity.preview.height}
                sizes="(min-width: 1024px) 60vw, 160vw"
                className="h-auto w-[160%] max-w-none transition-transform duration-700 ease-[var(--ease-grow)] group-hover:-translate-y-1.5 motion-reduce:transition-none sm:w-full"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-end bg-bark p-6 sm:p-10 lg:col-span-8">
          <p className="font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.02] font-light">
            {product.tagline ?? product.name}
          </p>
        </div>
      )}

      {/* Quenori's frame: the same for every product. */}
      <div className="flex flex-col gap-8 bg-ink p-6 sm:p-10 lg:col-span-4">
        <div className="flex items-center justify-between gap-4">
          <Status product={product} />
          {product.category && (
            <span className="eyebrow text-[0.6875rem] text-stone">{product.category}</span>
          )}
        </div>
        <div>
          <h3 id={titleId} className="font-display text-4xl font-light">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-4 leading-relaxed text-mist">{product.description}</p>
          )}
        </div>
        {product.highlights && (
          <ul aria-label={`What ${product.name} covers`} className="flex flex-wrap gap-2">
            {product.highlights.map((h) => (
              <li key={h} className="border border-line px-3 py-1.5 text-sm text-mist">
                {h}
              </li>
            ))}
          </ul>
        )}
        <a
          href={product.url}
          className="mt-auto inline-flex items-center justify-between gap-4 border-t border-line pt-6 text-paper transition-colors hover:text-lichen"
        >
          <span>
            Visit {product.name}
            <span className="block text-sm text-stone">{productHost(product)}</span>
          </span>
          <span aria-hidden className="text-xl transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>
    </article>
  );
}

function UpcomingProduct({ product }: { product: Product }) {
  return (
    <li className="flex flex-col gap-3 border-b border-line py-7 sm:px-7 sm:[&:nth-child(2n+1)]:pl-0 lg:[&:nth-child(2n+1)]:pl-7 lg:[&:nth-child(3n+1)]:pl-0">
      <p className="font-display text-2xl font-light text-mist">{product.name}</p>
      <p className="text-sm text-stone">{product.tagline ?? product.category ?? "Details to be announced"}</p>
      <p className="mt-auto flex items-center gap-2 pt-2 text-sm text-stone/80">
        <span aria-hidden className="inline-block size-1.5 rounded-full border border-stone" />
        <span className="sr-only">{statusLabel[product.status]}: </span>
        {productHost(product)}
      </p>
    </li>
  );
}

function Status({ product }: { product: Product }) {
  const live = product.status === "live";
  return (
    <span className="eyebrow inline-flex items-center gap-2 text-[0.6875rem]">
      <span
        aria-hidden
        className={`inline-block size-1.5 rounded-full ${live ? "bg-lichen" : "border border-stone"}`}
      />
      <span className={live ? "text-lichen" : "text-stone"}>{statusLabel[product.status]}</span>
    </span>
  );
}
