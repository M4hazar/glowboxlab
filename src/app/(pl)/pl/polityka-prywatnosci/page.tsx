import { LegalPage } from "@/components/site/legal-page";
import { privacy } from "@/content/legal";
import { pl as dict } from "@/content/pl";
import { pageMetadata } from "@/lib/metadata";

const doc = privacy.pl;

export const metadata = pageMetadata(dict, "privacy", {
  title: doc.title,
  description: doc.description,
});

export default function Page() {
  return <LegalPage dict={dict} doc={doc} routeKey="privacy" />;
}
