"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { THEME_COOKIE } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { currentTheme, useTheme } from "./use-theme";

// Suwak jasny/ciemny. Wybór zapisuje się w ciasteczku i wygrywa z ustawieniem urządzenia.
export function ThemeToggle({
  dict,
  className,
}: {
  dict: Dictionary;
  className?: string;
}) {
  const theme = useTheme();

  const toggle = () => {
    const next = currentTheme() === "light" ? "dark" : "light";
    // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API jest w Safari dopiero od 18.4
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    // Kolor paska przeglądarki ustawia useTheme, które obserwuje ten atrybut.
    const apply = () => {
      document.documentElement.dataset.theme = next;
    };
    // Płynne przejście całej strony naraz, zamiast osobnych animacji kolorów poszczególnych elementów.
    // Gałka ma własną nazwę przejścia, więc przeglądarka przesuwa ją na drugą stronę.
    if (
      document.startViewTransition &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      type="button"
      role="switch"
      // Przed hydratacją strona zakłada ciemny motyw, tak jak bez żadnych ustawień.
      aria-checked={theme !== "light"}
      aria-label={dict.a11y.darkMode}
      title={dict.a11y.darkMode}
      onClick={toggle}
      className={cn(
        "inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-ink/15 bg-ink/[0.06] p-[3px] transition-colors hover:border-ink/30",
        className,
      )}
    >
      {/* Położenie gałki i ikona zależą od atrybutu na <html>, więc są właściwe od pierwszej klatki. */}
      <span
        aria-hidden
        className="flex size-5 translate-x-5 items-center justify-center rounded-full bg-primary text-primary-foreground [view-transition-name:theme-thumb] light:translate-x-0"
      >
        <MoonIcon className="size-3 light:hidden" />
        <SunIcon className="hidden size-3 light:block" />
      </span>
    </button>
  );
}
