import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Dictionary } from "@/content/en";
import type { LegalDoc } from "@/content/legal";
import { type Locale, type RouteKey, routes } from "@/lib/site";
import { PageEffects } from "./page-effects";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function LegalPage({
  dict,
  doc,
  routeKey,
}: {
  dict: Dictionary;
  doc: LegalDoc;
  routeKey: RouteKey;
}) {
  const locale = dict.locale as Locale;
  return (
    <>
      <SiteHeader dict={dict} routeKey={routeKey} />
      <ViewTransition enter="page-in" exit="page-out" default="none">
        <main id="main" className="section max-w-3xl pt-32 pb-24 sm:pt-40">
          <Link
            href={routes.home[locale]}
            className="group rise inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon
              className="size-4 transition-transform duration-300 ease-glow group-hover:-translate-x-1"
              aria-hidden
            />
            {dict.legal.back}
          </Link>
          <h1 className="display rise mt-8 text-4xl [--delay:0.08s] sm:text-6xl">
            {doc.title}
          </h1>
          <p className="rise mt-6 text-lg text-pretty text-muted-foreground [--delay:0.16s]">
            {doc.intro}
          </p>
          <div className="mt-14 grid gap-12">
            {doc.sections.map((section) => (
              <section key={section.heading} id={section.id} data-reveal>
                <h2 className="text-xl font-bold tracking-tight">
                  {section.heading}
                </h2>
                {section.body.map((p) => (
                  <p
                    key={p}
                    className="mt-3 leading-relaxed text-foreground/80"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
          <p className="mt-16 text-sm text-muted-foreground">
            {dict.legal.updated}
          </p>
        </main>
      </ViewTransition>
      <SiteFooter dict={dict} routeKey={routeKey} />
      <PageEffects />
    </>
  );
}
