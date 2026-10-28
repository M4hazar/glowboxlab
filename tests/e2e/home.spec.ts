import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import { en } from "../../src/content/en";
import { pl } from "../../src/content/pl";
import { routes, site } from "../../src/lib/site";

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

test("sekcja kontaktu pokazuje e-mail, telefon, miasto i media społecznościowe", async ({
  page,
}) => {
  await page.goto("/");
  const contact = page.locator("#quote");
  await expect(contact.getByRole("link", { name: site.email })).toHaveAttribute(
    "href",
    `mailto:${site.email}`,
  );
  await expect(contact.getByRole("link", { name: site.phone })).toHaveAttribute(
    "href",
    site.phoneHref,
  );
  await expect(contact.getByText(en.contact.location)).toBeVisible();
  // Podpisane przyciski, WhatsApp jako pierwszy.
  const socials = contact
    .getByRole("list", { name: en.contact.socials })
    .getByRole("link");
  const expected = [
    site.whatsapp,
    site.instagram,
    site.facebook,
    site.tiktok,
    site.youtube,
  ];
  await expect(socials).toHaveText(expected.map((s) => s.name));
  for (const [i, s] of expected.entries()) {
    await expect(socials.nth(i)).toHaveAttribute("href", s.href);
  }
});

test("przycisk Start w menu wraca na stronę główną", async ({
  page,
  isMobile,
}) => {
  await page.goto(routes.privacy.pl);
  if (isMobile) await page.getByRole("button", { name: pl.a11y.menu }).click();
  const area = isMobile ? page.getByRole("dialog") : page.getByRole("banner");
  await area
    .getByRole("navigation", { name: pl.a11y.mainNav })
    .getByRole("link", { name: pl.nav[0].label, exact: true })
    .click();
  await expect(page).toHaveURL(/\/pl#top$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    pl.hero.title[0],
  );
});

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
  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === "NEXT_LOCALE")?.value).toBe("pl");
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

test("model 3D na górze strony: przycisk światła i pełny ekran", async ({
  page,
}) => {
  const t = en.viewer;
  await page.goto("/");
  const viewer = page.locator("#top");
  const light = viewer.getByRole("button", { name: t.light, exact: true });
  await expect(light).toHaveAttribute("aria-pressed", "true");
  await light.click();
  await expect(light).toHaveAttribute("aria-pressed", "false");

  const full = viewer.getByRole("button", { name: t.fullscreen });
  await full.click();
  await expect(
    viewer.getByRole("button", { name: t.exitFullscreen }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(viewer.getByRole("button", { name: t.zoomIn })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(full).toHaveAttribute("aria-pressed", "false");
  await expect(viewer.getByRole("button", { name: t.zoomIn })).toHaveCount(0);
});

test.describe("przeglądarka po polsku", () => {
  test.use({ locale: "pl-PL" });

  test("trafia z / na /pl", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/pl$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pl-PL");
  });

  test("zostaje po angielsku po ręcznym wyborze EN", async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([
      { name: "NEXT_LOCALE", value: "en", url: baseURL ?? "" },
    ]);
    await page.goto("/");
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  });
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
