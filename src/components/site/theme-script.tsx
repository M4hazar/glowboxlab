import { THEME_COLORS, THEME_COOKIE } from "@/lib/theme";

// Motyw ustala się przed pierwszym wyświetleniem strony, więc nic nie mignie:
// ręczny wybór z ciasteczka, a bez niego ustawienie urządzenia (także gdy zmieni się w trakcie,
// np. automatycznie wieczorem). Kolor paska przeglądarki (theme-color) idzie za motywem.
const themeScript = `(function(){try{var d=document.documentElement,m=matchMedia("(prefers-color-scheme: light)"),set=function(){var c=document.cookie.match(/(?:^|; )${THEME_COOKIE}=(light|dark)(?:;|$)/),t=c?c[1]:m.matches?"light":"dark";d.dataset.theme=t;document.querySelectorAll('meta[name="theme-color"]').forEach(function(e){e.content=t==="light"?"${THEME_COLORS.light}":"${THEME_COLORS.dark}"})};set();m.addEventListener("change",set);addEventListener("DOMContentLoaded",set)}catch(e){}})()`;

export function ThemeScript() {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: stały skrypt bez danych od użytkownika
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
