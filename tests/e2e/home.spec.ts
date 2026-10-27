import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import { en } from "../../src/content/en";
import { pl } from "../../src/content/pl";

const pages = [
  { path: "/", dict: en },
  { path: "/pl", dict: pl },
] as const;

for (const { path, dict } of pages) {
  test(`strona ${path} renderuje się w swoim języku`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(dict.meta.title);
    await expect(page.locator("html")).toHaveAttribute("lang", dict.htmlLang);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      dict.hero.title[0],
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="pl-PL"]'),
    ).toHaveAttribute("href", /\/pl$/);
    await expect(page.locator("#quote form")).toBeVisible();
  });
}

test("przełącznik języka prowadzi do polskiej wersji", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  // Na telefonie przełącznik jest w menu, na komputerze w nagłówku.
  if (isMobile) await page.getByRole("button", { name: en.a11y.menu }).click();
  const area = isMobile ? page.getByRole("dialog") : page.getByRole("banner");
  await area
    .getByRole("navigation", { name: en.a11y.language })
    .getByRole("link", { name: "PL" })
    .click();
  await expect(page).toHaveURL(/\/pl$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pl-PL");
});

test("formularz wyceny waliduje pola i wysyła zapytanie", async ({ page }) => {
  const f = en.quote.form;
  await page.goto("/#quote");
  const form = page.locator("#quote form");
  await form.getByRole("button", { name: f.submit }).click();
  await expect(form.getByText(en.quote.errors.summary)).toBeVisible();
  await expect(form.getByLabel(f.name, { exact: true })).toBeFocused();

  await form.getByLabel(f.name, { exact: true }).fill("Paweł");
  await form.getByLabel(f.email, { exact: true }).fill("pawel@example.com");
  await form.getByLabel(f.sizeUnsure).check();
  await form.getByRole("button", { name: f.increase }).click();
  await form
    .getByLabel(f.description)
    .fill("Our café logo, about 20 cm wide, for the wall behind the counter.");
  await form.locator('input[type="file"]').setInputFiles({
    name: "logo.svg",
    mimeType: "image/svg+xml",
    buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>'),
  });
  await expect(form.getByText("logo.svg")).toBeVisible();
  await form.getByLabel(f.consent).check();
  await form.getByRole("button", { name: f.submit }).click();

  await expect(
    page.getByText(f.successTitle.replace("{name}", "Paweł")),
  ).toBeVisible();
});

test("podgląd 3D: przełącznik światła i pełny ekran", async ({ page }) => {
  const t = en.viewer;
  await page.goto("/#preview");
  const viewer = page.locator("#preview");
  const off = viewer.getByRole("button", { name: t.off, exact: true });
  await off.click();
  await expect(off).toHaveAttribute("aria-pressed", "true");

  const full = viewer.getByRole("button", { name: t.fullscreen });
  await full.click();
  await expect(
    viewer.getByRole("button", { name: t.exitFullscreen }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(full).toHaveAttribute("aria-pressed", "false");
});

test("strony prawne i 404", async ({ page }) => {
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goto("/pl/zasady-wyceny");
  await expect(page.locator("html")).toHaveAttribute("lang", "pl-PL");

  const response = await page.goto("/nie-ma-takiej-strony");
  expect(response?.status()).toBe(404);
  await expect(page.getByText(en.notFound.title)).toBeVisible();
});

async function expectNoAxeViolations(page: Page, path: string) {
  // Bez animacji wejścia axe mierzy kontrast w stanie końcowym.
  await page.emulateMedia({ reducedMotion: "reduce" });
  // Model 3D zostaje w stanie ładowania: axe sprawdza DOM, a programowy
  // WebGL w CI potrafi zablokować wątek strony na wiele sekund.
  await page.route("**/*.glb", () => {});
  await page.goto(path);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
}

for (const path of ["/", "/pl", "/privacy", "/pl/polityka-prywatnosci"]) {
  test(`brak naruszeń WCAG 2.2 AA na ${path}`, async ({ page }) => {
    // Pełny audyt długiej strony przy równoległych testach WebGL trwa dłużej.
    test.slow();
    await expectNoAxeViolations(page, path);
  });
}
