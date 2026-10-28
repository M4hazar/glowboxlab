"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({
  dict,
  routeKey,
}: {
  dict: Dictionary;
  routeKey: RouteKey;
}) {
  const locale = dict.locale as Locale;
  const home = routes.home[locale];
  const nav = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  // Na podstronie portfolio menu od razu wskazuje Portfolio.
  const [current, setCurrent] = useState<string | null>(
    routeKey === "portfolio" ? "#work" : null,
  );
  const [pill, setPill] = useState<{ x: number; w: number; slide: boolean }>();

  // Nagłówek jest zawsze widoczny; po przewinięciu dostaje półprzezroczyste, rozmyte tło.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Podświetla w menu sekcję, która jest na środku ekranu.
  useEffect(() => {
    if (routeKey !== "home") return;
    const sections = dict.nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el) => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const el of sections) io.observe(el);
    return () => io.disconnect();
  }, [dict.nav, routeKey]);

  // Podświetlenie przesuwa się pod pozycję menu aktywnej sekcji.
  // Przy pierwszym pojawieniu staje od razu na miejscu, bez wjazdu z lewej.
  useEffect(() => {
    const el = nav.current;
    if (!el || !current) return setPill(undefined);
    const place = () => {
      const link = el.querySelector<HTMLElement>('a[aria-current="true"]');
      if (!link) return;
      setPill((prev) => ({
        x: link.offsetLeft,
        w: link.offsetWidth,
        slide: prev !== undefined,
      }));
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    return () => ro.disconnect();
  }, [current]);

  const anchor = (href: string) =>
    routeKey === "home" ? href : `${home}${href}`;

  return (
    // [--intro:0s]: nagłówek wchodzi od razu, pod ekranem startowym, żeby logo z ekranu
    // startowego wylądowało na nieruchomym logo w nagłówku.
    <header
      className={cn(
        "rise fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-glow [--intro:0s] [--rise:-16px]",
        scrolled
          ? "border-b border-ink/[0.07] bg-background/65 backdrop-blur-xl"
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
          <Logo className="header-logo h-8 w-auto lg:h-9" />
        </Link>

        <nav
          ref={nav}
          aria-label={dict.a11y.mainNav}
          className="relative hidden lg:block"
        >
          <span
            aria-hidden
            className={cn(
              "absolute top-0 left-0 h-full rounded-md bg-primary/20 ring-1 ring-brand/40 ring-inset",
              pill?.slide &&
                "transition-[transform,width] duration-500 ease-glow",
              !pill && "opacity-0",
            )}
            style={
              pill
                ? { width: pill.w, transform: `translateX(${pill.x}px)` }
                : undefined
            }
          />
          <ul className="relative flex items-center gap-1 text-[0.9rem] text-foreground/80">
            {dict.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={anchor(item.href)}
                  aria-current={current === item.href ? "true" : undefined}
                  className="block rounded-md px-4 py-2 transition-colors duration-300 hover:text-foreground aria-[current=true]:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-1 sm:flex">
            <ThemeToggle dict={dict} />
            <LanguageSwitch dict={dict} routeKey={routeKey} />
          </div>
          <a
            href={anchor("#quote")}
            className="press hidden h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-brand-strong sm:inline-flex"
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
              className="w-full border-ink/10 bg-background/95 backdrop-blur-xl sm:max-w-sm"
            >
              <div className="flex h-16 items-center justify-between px-5">
                <SheetTitle className="sr-only">{dict.a11y.mainNav}</SheetTitle>
                <Logo className="h-8 w-auto" />
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
                    <li key={item.href} className="border-b border-ink/[0.07]">
                      <SheetClose asChild>
                        <a
                          href={anchor(item.href)}
                          aria-current={
                            current === item.href ? "true" : undefined
                          }
                          className="flex items-center justify-between py-4 font-display text-2xl font-bold tracking-tight transition-colors aria-[current=true]:text-brand-soft"
                        >
                          {item.label}
                          {current === item.href && (
                            <span
                              aria-hidden
                              className="size-2 rounded-full bg-brand-soft"
                            />
                          )}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-4 pb-8">
                  <SheetClose asChild>
                    <a
                      href={anchor("#quote")}
                      className="press inline-flex h-12 items-center justify-center rounded-lg bg-primary font-semibold text-white hover:bg-brand-strong"
                    >
                      {dict.cta}
                    </a>
                  </SheetClose>
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/15 font-medium"
                  >
                    {dict.contact.whatsapp}
                  </a>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <ThemeToggle dict={dict} />
                    <LanguageSwitch dict={dict} routeKey={routeKey} />
                  </div>
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
          {i > 0 && <span aria-hidden className="mx-1.5 h-3 w-px bg-ink/20" />}
          {locale === current ? (
            <span
              aria-current="true"
              className="rounded px-1.5 py-1 font-semibold tracking-[0.14em] text-foreground"
            >
              {locale.toUpperCase()}
            </span>
          ) : (
            // Zwykły link, nie <Link>: każda wersja językowa ma własny root layout, więc i tak
            // wczytuje się od nowa, a bez prefetchu proxy od razu widzi ciasteczko z wyborem.
            <a
              href={routes[routeKey][locale]}
              hrefLang={locale === "pl" ? "pl-PL" : "en-GB"}
              lang={locale}
              onClick={(event) => switchLanguage(event, locale, dict, routeKey)}
              className="rounded px-1.5 py-1 tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {locale.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}

function switchLanguage(
  event: React.MouseEvent<HTMLAnchorElement>,
  locale: Locale,
  dict: Dictionary,
  routeKey: RouteKey,
) {
  // Ręczny wybór języka wygrywa z językiem przeglądarki przy kolejnych wejściach.
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API jest w Safari dopiero od 18.4
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey)
    return;
  // Na stronie głównej druga wersja otwiera się na tej samej sekcji.
  if (routeKey !== "home") return;
  const middle = window.innerHeight / 2;
  const section = dict.nav.slice(1).find((item) => {
    const rect = document.querySelector(item.href)?.getBoundingClientRect();
    return rect && rect.top <= middle && rect.bottom >= middle;
  });
  if (!section) return;
  event.preventDefault();
  window.location.assign(routes.home[locale] + section.href);
}
