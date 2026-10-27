import { ViewerSection } from "@/components/viewer/viewer-section";
import type { Dictionary } from "@/content/en";
import { Faq } from "./faq";
import { Hero } from "./hero";
import { HomeJsonLd } from "./json-ld";
import { QuoteSection } from "./quote-section";
import {
  Inspiration,
  Personalisation,
  Process,
  Technology,
  Work,
} from "./sections";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomePage({ dict }: { dict: Dictionary }) {
  return (
    <>
      <SiteHeader dict={dict} routeKey="home" />
      <main id="main">
        <Hero dict={dict} />
        <ViewerSection dict={dict} />
        <Work dict={dict} />
        <Personalisation dict={dict} />
        <Process dict={dict} />
        <Technology dict={dict} />
        <Inspiration dict={dict} />
        <Faq dict={dict} />
        <QuoteSection dict={dict} />
      </main>
      <SiteFooter dict={dict} routeKey="home" />
      <HomeJsonLd dict={dict} />
    </>
  );
}
