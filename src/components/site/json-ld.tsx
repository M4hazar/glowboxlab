import type { Dictionary } from "@/content/en";
import { absoluteUrl, type Locale, routes, site } from "@/lib/site";

export function HomeJsonLd({ dict }: { dict: Dictionary }) {
  const locale = dict.locale as Locale;
  const url = absoluteUrl(routes.home[locale]);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: absoluteUrl("/brand/sygnet.svg"),
        email: site.email,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "GB",
        },
        slogan: "Your idea. Made to glow.",
        sameAs: site.socials.map((s) => s.href),
        areaServed: "Europe",
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["en-GB", "pl-PL"],
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "Service",
        name: dict.hero.eyebrow,
        description: dict.meta.description,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: "Europe",
        url,
      },
      {
        "@type": "FAQPage",
        inLanguage: dict.htmlLang,
        url,
        mainEntity: dict.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: dane strukturalne z własnych treści
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
