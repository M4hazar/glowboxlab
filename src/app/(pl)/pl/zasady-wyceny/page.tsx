import { LegalPage } from "@/components/site/legal-page";
import { terms } from "@/content/legal";
import { pl as dict } from "@/content/pl";
import { pageMetadata } from "@/lib/metadata";

const doc = terms.pl;

export const metadata = pageMetadata(dict, "terms", {
  title: doc.title,
  description: doc.description,
});

export default function Page() {
  return <LegalPage dict={dict} doc={doc} routeKey="terms" />;
}
