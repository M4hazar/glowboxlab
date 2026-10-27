import { HomePage } from "@/components/site/home-page";
import { en as dict } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(dict, "home");

export default function Page() {
  return <HomePage dict={dict} />;
}
