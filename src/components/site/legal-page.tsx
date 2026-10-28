import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Dictionary } from "@/content/en";
import type { LegalDoc } from "@/content/legal";
import { type Locale, type RouteKey, routes } from "@/lib/site";
import { cn } from "@/lib/utils";
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
                {section.table && <LegalTable {...section.table} />}
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

// Na szerszym ekranie zwykła tabela, na telefonie każdy wiersz to osobna lista z podpisanymi polami.
function LegalTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <>
      <table className="mt-4 hidden w-full text-left text-sm sm:table">
        <thead>
          <tr className="border-b border-ink/10 text-muted-foreground">
            {head.map((cell) => (
              <th key={cell} scope="col" className="py-2 pr-4 font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-ink/[0.07]">
              {row.map((cell, i) => (
                <td
                  key={head[i]}
                  className={cn(
                    "py-3 pr-4 align-top text-foreground/80",
                    i === 0 && "font-mono whitespace-nowrap text-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 grid gap-3 sm:hidden">
        {rows.map((row) => (
          <dl
            key={row[0]}
            className="grid gap-2 rounded-lg border border-ink/[0.07] p-4 text-sm"
          >
            {row.map((cell, i) => (
              <div key={head[i]}>
                <dt className="text-muted-foreground">{head[i]}</dt>
                <dd
                  className={cn(
                    "text-foreground/80",
                    i === 0 && "font-mono text-foreground",
                  )}
                >
                  {cell}
                </dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
    </>
  );
}
