import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Placeholder for legal documents. Replace the body with the reviewed
 * policy text; this component intentionally contains no legal language.
 */
export function LegalPage({ title }: { title: string }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
      <p className="eyebrow text-stone">Legal</p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none">
        {title}
      </h1>
      <div className="mt-12 space-y-6 border-t border-line pt-10 text-lg leading-relaxed text-mist">
        <p>This document is being prepared and will be published here.</p>
        {site.contactEmail && (
          <p>
            In the meantime, questions can be sent to{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-paper underline decoration-line underline-offset-[6px] hover:decoration-lichen"
            >
              {site.contactEmail}
            </a>
            .
          </p>
        )}
        <p>
          <Link href="/" className="text-paper underline decoration-line underline-offset-[6px] hover:decoration-lichen">
            Back to quenori.com
          </Link>
        </p>
      </div>
    </article>
  );
}
