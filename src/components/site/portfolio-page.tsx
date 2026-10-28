import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/content/en";
import { type Locale, routes } from "@/lib/site";
import { PortfolioGrid } from "./portfolio";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PortfolioPage({ dict }: { dict: Dictionary }) {
  const locale = dict.locale as Locale;
  const home = routes.home[locale];
  const t = dict.portfolio;
  return (
    <>
      <SiteHeader dict={dict} routeKey="portfolio" />
      <main id="main" className="section pt-32 pb-24 sm:pt-40">
        <Link
          href={home}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" aria-hidden />
          {dict.legal.back}
        </Link>
        <h1 className="display mt-8 text-4xl sm:text-6xl">{t.title}</h1>
        <p className="lead mt-4 max-w-2xl">{t.lead}</p>
        <PortfolioGrid t={dict.work} quoteHref={`${home}#quote`} />
      </main>
      <SiteFooter dict={dict} routeKey="portfolio" />
    </>
  );
}
