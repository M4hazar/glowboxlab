import { type NextRequest, NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE, preferredLocale } from "@/lib/locale";

// Pierwsze wejście na stronę główną: przeglądarka po polsku trafia na /pl, każda inna zostaje na angielskiej.
export function proxy(request: NextRequest) {
  // Tylko zwykłe wczytanie strony. Next ukrywa przed proxy nagłówki zapytań RSC, więc
  // prefetch rozpoznajemy po Sec-Fetch-Dest: inaczej router zapamiętałby przekierowanie na /pl
  // i przełącznik języka przestawałby działać.
  const dest = request.headers.get("sec-fetch-dest");
  if (request.method !== "GET" || (dest && dest !== "document")) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved)
    ? saved
    : preferredLocale(request.headers.get("accept-language"));
  if (locale !== "pl") return;

  const url = request.nextUrl.clone();
  url.pathname = "/pl";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
