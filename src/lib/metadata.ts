import type { Metadata, Viewport } from "next";
import type { Dictionary } from "@/content/en";
import { alternates, type Locale, type RouteKey, site } from "@/lib/site";
import { THEME_COLORS } from "@/lib/theme";

// Bez JavaScriptu pasek przeglądarki idzie za ustawieniem urządzenia; skrypt motywu
// nadpisuje oba kolory, gdy ktoś wybrał motyw ręcznie.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
  colorScheme: "light dark",
};

export function pageMetadata(
  dict: Dictionary,
  key: RouteKey,
  override?: { title?: string; description?: string },
): Metadata {
  const locale = dict.locale as Locale;
  const title = override?.title ?? dict.meta.title;
  const description = override?.description ?? dict.meta.description;
  return {
    metadataBase: new URL(site.url),
    title: override?.title
      ? { absolute: `${override.title} | ${site.name}` }
      : title,
    description,
    alternates: alternates(key, locale),
    applicationName: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "pl" ? "pl_PL" : "en_GB",
      alternateLocale: locale === "pl" ? ["en_GB"] : ["pl_PL"],
      title,
      description,
      url: alternates(key, locale).canonical,
      images: [
        {
          url: dict.meta.ogImage,
          width: 1200,
          height: 630,
          alt: dict.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [dict.meta.ogImage],
    },
    formatDetection: { telephone: false },
  };
}
