"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/content/en";
import { isTheme, THEME_COLORS, THEME_COOKIE, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function currentTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : "dark";
}

// Przełącznik jasny/ciemny. Wybór zapisuje się w ciasteczku i wygrywa z ustawieniem urządzenia.
export function ThemeToggle({
  dict,
  className,
}: {
  dict: Dictionary;
  className?: string;
}) {
  const [theme, setTheme] = useState<Theme>();

  // Przełączniki w nagłówku i w menu mobilnym, a także zmiana ustawień urządzenia,
  // zmieniają ten sam atrybut na <html>, więc każdy przełącznik go obserwuje.
  useEffect(() => {
    const html = document.documentElement;
    const read = () => setTheme(currentTheme());
    read();
    const mo = new MutationObserver(read);
    mo.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  const toggle = () => {
    const next = currentTheme() === "light" ? "dark" : "light";
    // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API jest w Safari dopiero od 18.4
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    const apply = () => {
      document.documentElement.dataset.theme = next;
      for (const meta of document.querySelectorAll<HTMLMetaElement>(
        'meta[name="theme-color"]',
      )) {
        meta.content = THEME_COLORS[next];
      }
    };
    // Płynne przejście całej strony naraz, zamiast osobnych animacji kolorów poszczególnych elementów.
    if (
      document.startViewTransition &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  const label = theme === "light" ? dict.a11y.toDark : dict.a11y.toLight;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "press inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {/* Ikona zależy od atrybutu na <html>, więc jest właściwa od pierwszej klatki. */}
      <SunIcon aria-hidden className="size-[1.1rem] light:hidden" />
      <MoonIcon aria-hidden className="hidden size-[1.1rem] light:block" />
    </button>
  );
}
