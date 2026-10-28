import { PortfolioPage } from "@/components/site/portfolio-page";
import { pl as dict } from "@/content/pl";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(dict, "portfolio", {
  title: dict.portfolio.title,
  description: dict.portfolio.description,
});

export default function Page() {
  return <PortfolioPage dict={dict} />;
}
