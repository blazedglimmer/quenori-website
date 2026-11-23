import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Products } from "@/components/sections/Products";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/quenori-mark.svg`,
    description: site.description,
    ...(site.contactEmail ? { email: site.contactEmail } : {}),
    owns: products
      .filter((p) => p.status === "live")
      .map((p) => ({ "@type": "WebApplication", name: p.name, url: p.url })),
  };

  return (
    <>
      <Hero />
      <Products />
      <Philosophy />
      <About />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
