# GlowBox Lab

Strona marki **GlowBox Lab**: personalizowane lightboxy LED z druku 3D.
Wersja angielska pod `/`, polska pod `/pl`. Klient wysyła zapytanie z grafiką,
wymiarami, liczbą sztuk i opisem pomysłu, a wycenę przygotowujemy indywidualnie.

Stos: **Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui**, model 3D w
three.js (React Three Fiber), Biome, Vitest, Playwright + axe, Lighthouse CI i GitHub Actions.
Strona jest budowana do zwykłych plików (eksport statyczny) i działa na hostingu **OVH**
(Apache + PHP), bez serwera Node.js. Formularz wyceny obsługuje skrypt PHP, który wysyła
zapytanie pocztą z serwera OVH.

## Start

```bash
# Node 24 LTS (np. przez fnm/nvm: `fnm use` czyta .nvmrc)
corepack enable        # albo: npm i -g pnpm
pnpm install
pnpm dev               # http://localhost:3000 oraz /pl (bez formularza PHP)
```

Całą stronę z formularzem, przekierowaniem na /pl i nagłówkami jak na OVH pokazuje
`pnpm build && QUOTE_DRY_RUN=1 pnpm start` (wymaga `apache2` i `libapache2-mod-php`).
Z `QUOTE_DRY_RUN=1` zapytanie trafia do logu zamiast na e-mail.

## Wdrożenie (OVH)

1. `pnpm build` tworzy folder `out`: strona, `.htaccess`, `.ovhconfig` i formularz `api/`.
2. W `out/api/config.php` wpisz skrzynkę na zapytania (`to`) i nadawcę z domeny (`from`).
3. Wgraj całą zawartość `out` (także pliki z kropką na początku) do folderu `www` przez FTP.
4. W panelu OVH włącz certyfikat SSL dla domeny (`.htaccess` przekierowuje na HTTPS).

Pliki w `hosting/` to część serwerowa: `.htaccess` (HTTPS, przekierowanie na /pl, nagłówki
bezpieczeństwa, 404, cache), `.ovhconfig` (PHP 8.3) i `api/` (formularz). Kopiuje je do `out`
skrypt `scripts/copy-hosting.mjs`.

Załączniki są ograniczone do 3 plików i 4 MB łącznie.

Ochrona przed spamem działa bez captchy, ciasteczek i zewnętrznych usług: ukryte pole pułapka,
minimalny czas wypełnienia formularza (3 s) i limit 5 zapytań na 10 minut z jednego adresu IP
(zapisanego tylko jako skrót w `api/data`). Boty dostają udawany sukces.

## Komendy

| Komenda                       | Co robi                                                      |
| ----------------------------- | ------------------------------------------------------------ |
| `pnpm dev`                    | serwer deweloperski (Turbopack)                              |
| `pnpm build` / `pnpm start`   | pliki strony w `out` i ich podgląd na Apache z PHP           |
| `pnpm lint` / `pnpm lint:fix` | Biome: lint, formatowanie, sortowanie importów               |
| `pnpm typecheck`              | TypeScript bez emisji                                        |
| `pnpm test`                   | testy jednostkowe (Vitest + Testing Library)                 |
| `pnpm test:php`               | testy formularza PHP                                         |
| `pnpm test:e2e`               | testy E2E i dostępności (Playwright + axe), desktop i mobile |
| `pnpm lighthouse`             | Lighthouse CI z progami jakości                              |
| `pnpm check`                  | wszystko po kolei                                            |

Pierwsze uruchomienie Playwrighta lokalnie: `pnpm exec playwright install chromium`.

## Struktura

```
src/app/(en)          strona angielska i jej podstrony (polityka, zasady wyceny)
src/app/(pl)/pl       wersja polska z osobnym layoutem (lang="pl-PL")
src/content           wszystkie teksty: en.ts, pl.ts, legal.ts
src/components/site   sekcje strony, nagłówek, stopka, formularz
src/components/viewer interaktywny podgląd 3D lightboxa
src/components/ui     komponenty shadcn/ui
src/lib               schemat Zod formularza, wysyłka do PHP, dane firmy, metadane SEO
public/models         model lightboxa (GLB) skonwertowany z pliku 3MF
public/images         rendery i wizualizacje (WebP)
public/og             obrazy do udostępniania (1200x630)
hosting               .htaccess, .ovhconfig i formularz PHP (api/quote.php) dla OVH
scripts               kopiowanie plików serwera do out, podgląd na Apache
tests/e2e             testy Playwright i axe
tests/php             testy formularza PHP
```

## Treści i zdjęcia

- Teksty zmieniasz w `src/content/en.ts` i `src/content/pl.ts`. Test pilnuje,
  żeby obie wersje miały te same pola i żeby nie było w nich długich myślników.
- Telefon, e-mail, miasto, WhatsApp i profile społecznościowe są w `src/lib/site.ts`.
- Język: przeglądarka po polsku trafia z `/` na `/pl`, każda inna zostaje na angielskiej wersji.
  Ręczny wybór w przełączniku zapisuje się w ciasteczku `NEXT_LOCALE` (`hosting/.htaccess`).
- Motyw: strona jest ciemna albo jasna według ustawień urządzenia. Ręczny wybór przełącznikiem
  zapisuje się w ciasteczku `theme`. Kolory są w tokenach w `src/app/globals.css` (oba motywy).
- Zdjęcia w realizacjach to na razie przykładowe wizualizacje.
  Zastąp je zdjęciami prawdziwych realizacji w `public/images` (te same nazwy plików).

## Automatyzacja

- **lefthook**: przed commitem Biome + typecheck, przed pushem testy.
- **GitHub Actions** (`.github/workflows/ci.yml`): lint, typy, testy, build, E2E, Lighthouse.
- **AI**: `AGENTS.md` (zasady projektu dla agentów), `CLAUDE.md`, `.mcp.json`
  (Next.js DevTools, Playwright, shadcn, Context7).
