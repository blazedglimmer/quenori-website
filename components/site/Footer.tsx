import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { productHost, products, statusLabel } from "@/lib/products";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="font-display text-3xl font-light leading-tight">
              {site.tagline.replace(".", "")}
              <span className="text-lichen">.</span>
            </p>
            {site.contactEmail && (
              <a
                href={`mailto:${site.contactEmail}`}
                className="mt-6 inline-block text-mist underline decoration-line underline-offset-[6px] transition-colors hover:text-paper hover:decoration-lichen"
              >
                {site.contactEmail}
              </a>
            )}
          </div>

          <FooterColumn title="Navigate" className="lg:col-span-2 lg:col-start-6">
            <li>
              <Link href="/" className="hover:text-paper">
                Home
              </Link>
            </li>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Products" className="lg:col-span-3">
            {products.map((p) => (
              <li key={p.slug} className="flex items-baseline justify-between gap-4">
                {p.status === "live" ? (
                  <a href={p.url} className="hover:text-paper">
                    {p.name}
                  </a>
                ) : (
                  <span>{p.name}</span>
                )}
                <span className="eyebrow text-[0.625rem] text-stone">
                  {p.status === "live" ? productHost(p) : statusLabel[p.status]}
                </span>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Studio" className="lg:col-span-2">
            {site.contactEmail && (
              <li>
                <a href={`mailto:${site.contactEmail}`} className="hover:text-paper">
                  Contact
                </a>
              </li>
            )}
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} rel="me noopener" className="hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/brand" className="hover:text-paper">
                Brand guidelines
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-paper">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-paper">
                Terms of Service
              </Link>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-20 text-paper sm:mt-28">
          <Wordmark className="h-auto w-full" />
        </div>

        <div className="eyebrow flex flex-col gap-3 border-t border-line py-8 text-[0.6875rem] text-stone sm:flex-row sm:items-center sm:justify-between">
          <span>© Quenori. All rights reserved.</span>
          <span>quenori.com</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={title} className={className}>
      <h3 className="eyebrow text-stone">{title}</h3>
      <ul className="mt-6 space-y-3 text-mist">{children}</ul>
    </nav>
  );
}
