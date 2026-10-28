import { PortfolioPage } from "@/components/site/portfolio-page";
import { en as dict } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(dict, "portfolio", {
  title: dict.portfolio.title,
  description: dict.portfolio.description,
});

export default function Page() {
  return <PortfolioPage dict={dict} />;
}
