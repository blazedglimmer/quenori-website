import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ path: "/terms", title: "Terms of Service" });

export default function TermsPage() {
  return <LegalPage title="Terms of Service" />;
}
