import { LegalPage } from "@/components/site/legal-page";
import { cookies } from "@/content/legal";
import { pl as dict } from "@/content/pl";
import { pageMetadata } from "@/lib/metadata";

const doc = cookies.pl;

export const metadata = pageMetadata(dict, "cookies", {
  title: doc.title,
  description: doc.description,
});

export default function Page() {
  return <LegalPage dict={dict} doc={doc} routeKey="cookies" />;
}
