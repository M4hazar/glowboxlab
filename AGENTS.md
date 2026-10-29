<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Projekt: GlowBox Lab

Strona marki GlowBox Lab (lightboxy LED z druku 3D). Angielska pod `/`, polska pod `/pl`.

Stos: Next.js 16 (App Router, eksport statyczny, Turbopack), React 19, TypeScript,
Tailwind CSS v4, shadcn/ui (styl new-york, Radix), React Three Fiber (three.js),
Zod, PHP 8.3 (formularz), Biome, Vitest, Playwright (+ axe), Lighthouse CI.
Hosting: tylko zwykły hosting OVH (Apache + PHP), bez Node.js. Strona to pliki z `out`.
Menedżer pakietów: **pnpm** (Node 24 LTS).

### Komendy

- `pnpm dev`: serwer deweloperski
- `pnpm lint` / `pnpm lint:fix`: Biome (lint, format, importy)
- `pnpm typecheck`: generuje typy tras i uruchamia TypeScript
- `pnpm test`: Vitest (testy jednostkowe w `src/**/*.test.{ts,tsx}`)
- `pnpm test:php`: testy formularza PHP (`tests/php`)
- `pnpm build` / `pnpm start`: pliki strony w `out` i ich podgląd na Apache z PHP
- `pnpm test:e2e`: Playwright (`tests/e2e`, wymaga `pnpm build`, apache2 i libapache2-mod-php)
- `pnpm lighthouse`: Lighthouse CI (progi w `lighthouserc.json`)
- `pnpm check`: wszystko powyżej po kolei

### Zasady

- Komponenty UI dodawaj przez `pnpm dlx shadcn@latest add <nazwa>` do `src/components/ui`;
  nie edytuj ich bez potrzeby, kompozycje twórz w `src/components/site`.
- Kolory tylko przez tokeny motywu (`bg-background`, `text-brand`, `text-muted-foreground` itd.)
  z `src/app/globals.css` (także `ink` zamiast `white/...` dla linii i delikatnych teł).
  Strona ma motyw ciemny i jasny (wybór z urządzenia albo przełącznika); sprawdzaj oba.
- Domyślnie Server Components; `"use client"` tylko tam, gdzie potrzebna interaktywność.
- Bez funkcji wymagających serwera Node.js (Server Actions, proxy, `cookies()`, API routes):
  eksport statyczny ich nie obsłuży. Logika serwera to PHP w `hosting/api`, a przekierowania
  i nagłówki to `hosting/.htaccess` (oba kopiowane do `out` przy `pnpm build`).
- Formularze: schemat Zod w `src/lib` (sprawdzenie w przeglądarce) i te same reguły
  w `hosting/api/quote-lib.php` (sprawdzenie na serwerze). Zmieniaj je razem.
- Każda nowa strona ma `metadata` (przez `pageMetadata` z `src/lib/metadata.ts`) i trasę
  w obu językach w `routes` (`src/lib/site.ts`); dbaj o WCAG 2.2 AA (test axe musi przechodzić).
- Teksty tylko w słownikach `src/content/en.ts` i `pl.ts`, nigdy wpisane w komponentach.
- W treściach nie używamy długich ani średnich myślników (marka uważa je za sztuczne).
  Pilnuje tego `src/__tests__/content.test.ts`.
- Przed zakończeniem pracy uruchom `pnpm lint && pnpm typecheck && pnpm test`.
