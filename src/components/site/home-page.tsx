import { ViewTransition } from "react";
import type { Dictionary } from "@/content/en";
import { Faq } from "./faq";
import { Hero } from "./hero";
import { HomeJsonLd } from "./json-ld";
import { PageEffects } from "./page-effects";
import { Process } from "./process";
import { QuoteSection } from "./quote-section";
import { Work } from "./sections";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomePage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <SiteHeader dict={dict} routeKey="home" />
      <ViewTransition enter="page-in" exit="page-out" default="none">
        <main id="main">
          <Hero dict={dict} />
          <Work dict={dict} />
          <Process dict={dict} />
          <Faq dict={dict} />
          <QuoteSection dict={dict} />
        </main>
      </ViewTransition>
      <SiteFooter dict={dict} routeKey="home" />
      <HomeJsonLd dict={dict} />
      <PageEffects />
    </>
  );
}
