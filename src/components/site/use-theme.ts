"use client";

import { useEffect, useState } from "react";
import { isTheme, THEME_COLORS, type Theme } from "@/lib/theme";

export function currentTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : "dark";
}

// Aktualny motyw strony (undefined przed hydratacją). Przełączniki w nagłówku i w menu
// mobilnym, a także zmiana ustawień urządzenia, zmieniają ten sam atrybut na <html>,
// więc hook go obserwuje. Przy okazji ustawia kolor paska przeglądarki (theme-color):
// React po hydratacji dokłada własne kopie tych znaczników, których skrypt w <head> nie widział.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>();
  useEffect(() => {
    const read = () => {
      const next = currentTheme();
      setTheme(next);
      for (const meta of document.querySelectorAll<HTMLMetaElement>(
        'meta[name="theme-color"]',
      )) {
        meta.content = THEME_COLORS[next];
      }
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);
  return theme;
}
