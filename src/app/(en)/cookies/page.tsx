import { LegalPage } from "@/components/site/legal-page";
import { en as dict } from "@/content/en";
import { cookies } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

const doc = cookies.en;

export const metadata = pageMetadata(dict, "cookies", {
  title: doc.title,
  description: doc.description,
});

export default function Page() {
  return <LegalPage dict={dict} doc={doc} routeKey="cookies" />;
}
