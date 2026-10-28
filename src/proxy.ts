import { type NextRequest, NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE, preferredLocale } from "@/lib/locale";

// Pierwsze wejście na stronę główną: przeglądarka po polsku trafia na /pl, każda inna zostaje na angielskiej.
export function proxy(request: NextRequest) {
  // Tylko zwykłe wejście na stronę: bez wysyłki formularza i nawigacji wewnątrz aplikacji.
  if (request.method !== "GET" || request.headers.has("rsc")) return;

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
