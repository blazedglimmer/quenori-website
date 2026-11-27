import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ path: "/privacy", title: "Privacy Policy" });

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" />;
}
