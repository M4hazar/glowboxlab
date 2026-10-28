"use client";

import { useEffect, useState } from "react";
import { isTheme, type Theme } from "@/lib/theme";

export function currentTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : "dark";
}

// Aktualny motyw strony (undefined przed hydratacją). Przełączniki w nagłówku i w menu
// mobilnym, a także zmiana ustawień urządzenia, zmieniają ten sam atrybut na <html>,
// więc hook go obserwuje.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>();
  useEffect(() => {
    const read = () => setTheme(currentTheme());
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
