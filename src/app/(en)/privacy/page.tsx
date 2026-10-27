import { LegalPage } from "@/components/site/legal-page";
import { en as dict } from "@/content/en";
import { privacy } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

const doc = privacy.en;

export const metadata = pageMetadata(dict, "privacy", {
  title: doc.title,
  description: doc.description,
});

export default function Page() {
  return <LegalPage dict={dict} doc={doc} routeKey="privacy" />;
}
