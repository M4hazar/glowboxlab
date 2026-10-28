"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Dictionary } from "@/content/en";
import { LOCALE_COOKIE } from "@/lib/locale";
import { type Locale, type RouteKey, routes, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader({
  dict,
  routeKey,
}: {
  dict: Dictionary;
  routeKey: RouteKey;
}) {
  const locale = dict.locale as Locale;
  const home = routes.home[locale];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const anchor = (href: string) =>
    routeKey === "home" ? href : `${home}${href}`;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-white/[0.07] bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        {dict.a11y.skip}
      </a>
      <div className="section flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href={home} aria-label={dict.a11y.home} className="shrink-0">
          {/* biome-ignore lint/performance/noImgElement: logo SVG nie potrzebuje optymalizacji */}
          <img
            src="/brand/logo.svg"
            alt=""
            width={744}
            height={225}
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        <nav aria-label={dict.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[0.9rem] text-foreground/80">
            {dict.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={anchor(item.href)}
                  className="transition-colors duration-300 hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitch
            dict={dict}
            routeKey={routeKey}
            className="hidden sm:flex"
          />
          <a
            href={anchor("#quote")}
            className="hidden h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-white shadow-glow-sm transition-colors hover:bg-brand-strong sm:inline-flex"
          >
            {dict.cta}
          </a>
          <Sheet>
            <SheetTrigger
              aria-label={dict.a11y.menu}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-foreground lg:hidden"
            >
              <MenuIcon className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-full border-white/10 bg-background/95 backdrop-blur-xl sm:max-w-sm"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <SheetTitle className="sr-only">{dict.a11y.mainNav}</SheetTitle>
                {/* biome-ignore lint/performance/noImgElement: logo SVG */}
                <img
                  src="/brand/logo.svg"
                  alt=""
                  width={744}
                  height={225}
                  className="h-8 w-auto"
                />
                <SheetClose
                  aria-label={dict.a11y.closeMenu}
                  className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg"
                >
                  <XIcon className="size-6" />
                </SheetClose>
              </div>
              <nav
                aria-label={dict.a11y.mainNav}
                className="flex flex-1 flex-col px-5 pt-6"
              >
                <ul className="flex flex-col">
                  {dict.nav.map((item) => (
                    <li
                      key={item.href}
                      className="border-b border-white/[0.07]"
                    >
                      <SheetClose asChild>
                        <a
                          href={anchor(item.href)}
                          className="block py-4 font-display text-2xl font-bold tracking-tight"
                        >
                          {item.label}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-4 pb-8">
                  <SheetClose asChild>
                    <a
                      href={anchor("#quote")}
                      className="inline-flex h-12 items-center justify-center rounded-lg bg-primary font-semibold text-white"
                    >
                      {dict.cta}
                    </a>
                  </SheetClose>
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-white/15 font-medium"
                  >
                    {dict.contact.whatsapp}
                  </a>
                  <LanguageSwitch
                    dict={dict}
                    routeKey={routeKey}
                    className="justify-center pt-2"
                  />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function LanguageSwitch({
  dict,
  routeKey,
  className,
}: {
  dict: Dictionary;
  routeKey: RouteKey;
  className?: string;
}) {
  const current = dict.locale as Locale;
  return (
    <nav
      aria-label={dict.a11y.language}
      className={cn("flex items-center text-xs", className)}
    >
      {(["en", "pl"] as const).map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && (
            <span aria-hidden className="mx-1.5 h-3 w-px bg-white/20" />
          )}
          {locale === current ? (
            <span
              aria-current="true"
              className="rounded px-1.5 py-1 font-semibold tracking-[0.14em] text-foreground"
            >
              {locale.toUpperCase()}
            </span>
          ) : (
            <Link
              href={routes[routeKey][locale]}
              hrefLang={locale === "pl" ? "pl-PL" : "en-GB"}
              lang={locale}
              onClick={() => {
                // Ręczny wybór języka wygrywa z językiem przeglądarki przy kolejnych wejściach.
                // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API jest w Safari dopiero od 18.4
                document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
              }}
              className="rounded px-1.5 py-1 tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {locale.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
