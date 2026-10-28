import type { Locale } from "./site";

// Ciasteczko z językiem wybranym ręcznie w przełączniku. Ma pierwszeństwo przed przeglądarką.
export const LOCALE_COOKIE = "NEXT_LOCALE";

// Zmiana języka wczytuje drugą wersję strony od nowa. Ten znacznik w sessionStorage mówi
// skryptowi w <head>, żeby po takim przejściu nie pokazywał ekranu startowego.
export const SKIP_INTRO_KEY = "gbl-skip-intro";

/**
 * Wybiera język strony z nagłówka Accept-Language.
 * Polski tylko wtedy, gdy jest najwyżej ocenionym z obsługiwanych języków, w każdym innym przypadku angielski.
 */
export function preferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return "en";
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number(q.trim().slice(2)) : 1;
      return { lang: tag.split("-")[0], quality, index };
    })
    .filter((item) => item.lang && item.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);
  const first = ranked.find((item) => item.lang === "pl" || item.lang === "en");
  return first?.lang === "pl" ? "pl" : "en";
}

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "pl";
}
