import { HomePage } from "@/components/site/home-page";
import { pl as dict } from "@/content/pl";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(dict, "home");

export default function Page() {
  return <HomePage dict={dict} />;
}
