import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "@/content/en";
import type { LegalDoc } from "@/content/legal";
import { type Locale, type RouteKey, routes } from "@/lib/site";
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
      <main id="main" className="section max-w-3xl pt-32 pb-24 sm:pt-40">
        <Link
          href={routes.home[locale]}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" aria-hidden />
          {dict.legal.back}
        </Link>
        <h1 className="display mt-8 text-4xl sm:text-6xl">{doc.title}</h1>
        <p className="mt-6 text-lg text-pretty text-muted-foreground">
          {doc.intro}
        </p>
        <div className="mt-14 grid gap-12">
          {doc.sections.map((section) => (
            <section
              key={section.heading}
              id={section.id}
              aria-labelledby={`${section.id ?? section.heading}-h`}
            >
              <h2
                id={`${section.id ?? section.heading}-h`}
                className="text-xl font-bold tracking-tight"
              >
                {section.heading}
              </h2>
              {section.body.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-foreground/80">
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
      <SiteFooter dict={dict} routeKey={routeKey} />
    </>
  );
}
