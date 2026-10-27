# GlowBox starter

Szablon nowoczesnej strony: **Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui**,
z lintowaniem (Biome), testami (Vitest, Playwright + axe), audytem Lighthouse
i CI na GitHub Actions. Gotowy do pracy z Claude Code, Cursorem i Copilotem.

## Start

```bash
# Node 24 LTS (np. przez fnm/nvm: `fnm use` czyta .nvmrc)
corepack enable        # albo: npm i -g pnpm
pnpm install
cp .env.example .env.local
pnpm dev               # http://localhost:3000
```

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
src/app/            strony, layout, Server Actions, sitemap/robots
src/components/ui   komponenty shadcn/ui (dodawaj: pnpm dlx shadcn@latest add dialog)
src/components/site kompozycje strony (formularz, animacje)
src/lib             narzędzia i schematy Zod
tests/e2e           testy Playwright
```

## Automatyzacja

- **lefthook**: przed commitem Biome + typecheck, przed pushem testy.
- **GitHub Actions** (`.github/workflows/ci.yml`): lint, typy, testy, build, E2E, Lighthouse.
- **AI**: `AGENTS.md` (zasady projektu dla agentów), `CLAUDE.md`, `.mcp.json`
  (Next.js DevTools, Playwright, shadcn, Context7).
