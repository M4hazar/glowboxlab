# GlowBox Lab

Strona marki **GlowBox Lab**: personalizowane lightboxy LED z druku 3D.
Wersja angielska pod `/`, polska pod `/pl`. Klient wysyła zapytanie z grafiką,
wymiarami, liczbą sztuk i opisem pomysłu, a wycenę przygotowujemy indywidualnie.

Stos: **Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui**, model 3D w
three.js (React Three Fiber), formularz na Server Action z wysyłką przez Resend,
Biome, Vitest, Playwright + axe, Lighthouse CI i GitHub Actions.

## Start

```bash
# Node 24 LTS (np. przez fnm/nvm: `fnm use` czyta .nvmrc)
corepack enable        # albo: npm i -g pnpm
pnpm install
cp .env.example .env.local
pnpm dev               # http://localhost:3000 oraz /pl
```

Bez `RESEND_API_KEY` formularz działa lokalnie i wypisuje zapytanie w konsoli.

## Wdrożenie (Vercel)

1. Zaimportuj repozytorium w Vercel (framework wykryje się sam).
2. Ustaw zmienne z `.env.example`: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`,
   `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL`.
3. W Resend zweryfikuj domenę `glowboxlab.com`, żeby wysyłać z własnego adresu.
4. Podepnij domenę w Vercel.

Załączniki są ograniczone do 3 plików i 4 MB łącznie (limit funkcji Vercel to 4,5 MB).

## Komendy

| Komenda                       | Co robi                                                      |
| ----------------------------- | ------------------------------------------------------------ |
| `pnpm dev`                    | serwer deweloperski (Turbopack)                              |
| `pnpm build` / `pnpm start`   | build produkcyjny i jego uruchomienie                        |
| `pnpm lint` / `pnpm lint:fix` | Biome: lint, formatowanie, sortowanie importów               |
| `pnpm typecheck`              | TypeScript bez emisji                                        |
| `pnpm test`                   | testy jednostkowe (Vitest + Testing Library)                 |
| `pnpm test:e2e`               | testy E2E i dostępności (Playwright + axe), desktop i mobile |
| `pnpm lighthouse`             | Lighthouse CI z progami jakości                              |
| `pnpm check`                  | wszystko po kolei                                            |

Pierwsze uruchomienie Playwrighta lokalnie: `pnpm exec playwright install chromium`.

## Struktura

```
src/app/(en)          strona angielska i jej podstrony (polityka, zasady wyceny)
src/app/(pl)/pl       wersja polska z osobnym layoutem (lang="pl-PL")
src/app/actions       Server Action formularza wyceny (Resend)
src/content           wszystkie teksty: en.ts, pl.ts, legal.ts
src/components/site   sekcje strony, nagłówek, stopka, formularz
src/components/viewer interaktywny podgląd 3D lightboxa
src/components/ui     komponenty shadcn/ui
src/lib               schemat Zod formularza, dane firmy, metadane SEO
public/models         model lightboxa (GLB) skonwertowany z pliku 3MF
public/images         rendery i wizualizacje (WebP)
public/og             obrazy do udostępniania (1200x630)
tests/e2e             testy Playwright i axe
```

## Treści i zdjęcia

- Teksty zmieniasz w `src/content/en.ts` i `src/content/pl.ts`. Test pilnuje,
  żeby obie wersje miały te same pola i żeby nie było w nich długich myślników.
- Telefon, WhatsApp i profile społecznościowe są w `src/lib/site.ts`.
- Język: przeglądarka po polsku trafia z `/` na `/pl`, każda inna zostaje na angielskiej wersji.
  Ręczny wybór w przełączniku zapisuje się w ciasteczku `NEXT_LOCALE` (`src/proxy.ts`).
- Zdjęcia w galerii i inspiracjach to na razie przykładowe wizualizacje.
  Zastąp je zdjęciami prawdziwych realizacji w `public/images` (te same nazwy plików).

## Automatyzacja

- **lefthook**: przed commitem Biome + typecheck, przed pushem testy.
- **GitHub Actions** (`.github/workflows/ci.yml`): lint, typy, testy, build, E2E, Lighthouse.
- **AI**: `AGENTS.md` (zasady projektu dla agentów), `CLAUDE.md`, `.mcp.json`
  (Next.js DevTools, Playwright, shadcn, Context7).
