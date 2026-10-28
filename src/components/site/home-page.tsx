import type { Dictionary } from "@/content/en";
import { Faq } from "./faq";
import { Hero } from "./hero";
import { HomeJsonLd } from "./json-ld";
import { QuoteSection } from "./quote-section";
import { Process, Work } from "./sections";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomePage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <SiteHeader dict={dict} routeKey="home" />
      <main id="main">
        <Hero dict={dict} />
        <Work dict={dict} />
        <Process dict={dict} />
        <Faq dict={dict} />
        <QuoteSection dict={dict} />
      </main>
      <SiteFooter dict={dict} routeKey="home" />
      <HomeJsonLd dict={dict} />
    </>
  );
}
