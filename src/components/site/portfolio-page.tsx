import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Dictionary } from "@/content/en";
import { type Locale, routes } from "@/lib/site";
import { PageEffects } from "./page-effects";
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
      <ViewTransition enter="page-in" exit="page-out" default="none">
        <main id="main" className="section pt-32 pb-24 sm:pt-40">
          <Link
            href={home}
            className="group rise inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon
              className="size-4 transition-transform duration-300 ease-glow group-hover:-translate-x-1"
              aria-hidden
            />
            {dict.legal.back}
          </Link>
          <h1 className="display rise mt-8 text-4xl [--delay:0.08s] sm:text-6xl">
            {t.title}
          </h1>
          <p className="lead rise mt-4 max-w-2xl [--delay:0.16s]">{t.lead}</p>
          <PortfolioGrid t={dict.work} quoteHref={`${home}#quote`} />
        </main>
      </ViewTransition>
      <SiteFooter dict={dict} routeKey="portfolio" />
      <PageEffects />
    </>
  );
}
