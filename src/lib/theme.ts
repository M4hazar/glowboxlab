// Ciasteczko z motywem wybranym ręcznie przełącznikiem. Ma pierwszeństwo przed ustawieniem urządzenia.
export const THEME_COOKIE = "theme";

export type Theme = "light" | "dark";

export function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark";
}

// Kolor tła strony w każdym motywie, także dla paska przeglądarki (theme-color).
export const THEME_COLORS: Record<Theme, string> = {
  light: "#f6f7f9",
  dark: "#05070a",
};
