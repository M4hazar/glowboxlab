// Dane kontaktowe i adresy marki w jednym miejscu.
const instagram = {
  name: "Instagram",
  href: "https://www.instagram.com/glowboxlab",
} as const;
const facebook = {
  name: "Facebook",
  href: "https://www.facebook.com/glowboxlab",
} as const;
const tiktok = {
  name: "TikTok",
  href: "https://www.tiktok.com/@glowboxlab",
} as const;
const youtube = {
  name: "YouTube",
  href: "https://www.youtube.com/@glowboxlab",
} as const;

export const site = {
  name: "GlowBox Lab",
  // Osoba prowadząca sprzedaż. Adresu domowego celowo nie publikujemy.
  owner: "Mateusz Pawlak",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://glowboxlab.com",
  // Adres do potwierdzenia, na razie w domenie marki.
  email: "hello@glowboxlab.com",
  phone: "+44 7749 789776",
  phoneHref: "tel:+447749789776",
  whatsapp: { name: "WhatsApp", href: "https://wa.me/447749789776" },
  handle: "@glowboxlab",
  city: "Walsall",
  instagram,
  facebook,
  tiktok,
  youtube,
  socials: [instagram, facebook, tiktok, youtube],
} as const;

export type Locale = "en" | "pl";

// Odpowiadające sobie strony w obu językach.
export const routes = {
  home: { en: "/", pl: "/pl" },
  portfolio: { en: "/portfolio", pl: "/pl/portfolio" },
  privacy: { en: "/privacy", pl: "/pl/polityka-prywatnosci" },
  terms: { en: "/quote-terms", pl: "/pl/zasady-wyceny" },
} as const;

export type RouteKey = keyof typeof routes;

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function alternates(key: RouteKey, locale: Locale) {
  return {
    canonical: routes[key][locale],
    languages: {
      "en-GB": routes[key].en,
      "pl-PL": routes[key].pl,
      "x-default": routes[key].en,
    },
  };
}
