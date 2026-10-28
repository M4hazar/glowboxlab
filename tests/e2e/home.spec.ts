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
  for (const text of en.contact.promises) {
    await expect(contact.getByText(text)).toBeVisible();
  }
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

test("przycisk Home w menu wraca na stronę główną", async ({
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
  // Kliknięcie uruchamia scenę 3D, a programowy WebGL potrafi spowolnić przejście na /pl.
  await page.route("**/*.glb", () => {});
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
  // Programowy WebGL potrafi na długo zablokować stronę, a ten test nie dotyczy modelu.
  await page.route("**/*.glb", () => {});
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

test("portfolio: pasek się przewija, staje i pokazuje szczegóły projektu", async ({
  page,
}) => {
  const t = en.work;
  const c = t.controls;
  await page.route("**/*.glb", () => {});
  await page.goto("/#work");
  const work = page.locator("#work");
  const scroller = work.getByRole("list").locator("..");
  const left = () => scroller.evaluate((el) => el.scrollLeft);

  const start = await left();
  await expect.poll(left).not.toBe(start);
  await work.getByRole("button", { name: c.pause }).click();
  await expect(work.getByRole("button", { name: c.play })).toBeVisible();
  await page.waitForTimeout(1500);
  const stopped = await left();
  await page.waitForTimeout(500);
  expect(await left()).toBe(stopped);

  const card = (i: number) =>
    work.getByRole("button", { name: new RegExp(t.items[i].title) });
  await card(1).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAccessibleName(t.items[1].title);
  await expect(dialog.getByText(t.items[1].description)).toBeVisible();
  await dialog.getByRole("button", { name: c.next }).click();
  await expect(dialog).toHaveAccessibleName(t.items[2].title);
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveAccessibleName(t.items[0].title);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(card(0)).toBeFocused();

  await card(1).click();
  await dialog.getByRole("link", { name: c.cta }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/#quote$/);
  await expect(page.locator("#quote-title")).toBeInViewport();
});

test("podstrona portfolio pokazuje wszystkie projekty", async ({ page }) => {
  const t = pl.work;
  await page.route("**/*.glb", () => {});
  await page.goto("/pl#work");
  await page
    .locator("#work")
    .getByRole("link", { name: t.controls.all })
    .click();
  await expect(page).toHaveURL(/\/pl\/portfolio$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    pl.portfolio.title,
  );
  const main = page.getByRole("main");
  for (const item of t.items) {
    await expect(
      main.getByRole("button", { name: new RegExp(item.title) }),
    ).toBeVisible();
  }
  await main
    .getByRole("button", { name: new RegExp(t.items[2].title) })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAccessibleName(t.items[2].title);
  await dialog.getByRole("link", { name: t.controls.cta }).click();
  await expect(page).toHaveURL(/\/pl#quote$/);
});

test("powrót z podstrony prowadzi na górę strony głównej", async ({ page }) => {
  await page.route("**/*.glb", () => {});
  await page.goto(routes.portfolio.pl);
  await page.getByRole("link", { name: pl.legal.back }).click();
  await expect(page).toHaveURL(/\/pl$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
});

test("proces: kroki zmieniają się zakładkami, strzałkami i klawiaturą", async ({
  page,
}) => {
  const t = pl.process;
  await page.route("**/*.glb", () => {});
  await page.goto("/pl#process");
  const section = page.locator("#process");
  const tabs = section.getByRole("tab");
  const title = section.getByRole("tabpanel").getByRole("heading", {
    level: 3,
  });
  await expect(tabs).toHaveCount(t.steps.length);
  await expect(title).toHaveText(t.steps[0].title);

  await section.getByRole("tab", { name: t.steps[2].title }).click();
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
  await expect(title).toHaveText(t.steps[2].title);
  for (const detail of t.steps[2].details) {
    await expect(section.getByText(detail)).toBeVisible();
  }

  const next = section.getByRole("button", { name: t.next });
  await next.click();
  await expect(title).toHaveText(t.steps[3].title);
  // Za ostatnim krokiem strzałka wraca na początek.
  await next.click();
  await expect(title).toHaveText(t.steps[0].title);
  await section.getByRole("button", { name: t.previous }).click();
  await expect(title).toHaveText(t.steps[3].title);

  await tabs.nth(0).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(title).toHaveText(t.steps[1].title);

  await section
    .getByRole("tabpanel")
    .getByRole("link", { name: pl.cta })
    .click();
  await expect(page).toHaveURL(/#quote$/);
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

test("animacje: ekran startowy przy każdym wczytaniu, sekcje odsłaniają się przy przewijaniu", async ({
  page,
}) => {
  await page.route("**/*.glb", () => {});
  await page.goto("/pl");
  const html = page.locator("html");
  const intro = page.locator(".intro");
  await expect(html).toHaveAttribute("data-motion", "");
  await expect(html).toHaveAttribute("data-intro", "");
  // Ekran startowy nie blokuje kliknięć i znika sam.
  await expect(intro).toHaveCSS("pointer-events", "none");
  await expect(intro).toHaveCSS("position", "fixed");
  await expect(intro).toBeHidden({ timeout: 5000 });
  await expect(html).not.toHaveAttribute("data-intro", { timeout: 5000 });

  // Odświeżenie pokazuje go ponownie.
  await page.reload();
  await expect(html).toHaveAttribute("data-intro", "");
  await expect(intro).toHaveCSS("position", "fixed");
  await expect(intro).toBeHidden({ timeout: 5000 });

  const faq = page.locator("#faq [data-reveal]").first();
  await expect(faq).not.toHaveAttribute("data-revealed");
  await faq.scrollIntoViewIfNeeded();
  await expect(faq).toHaveAttribute("data-revealed", "");
  await expect(faq).toHaveCSS("opacity", "1");
});

test("bez arkusza stylów logo ekranu startowego nie wypada na stronę", async ({
  page,
}) => {
  await page.route("**/*.glb", () => {});
  await page.route("**/*.css*", (route) => route.abort());
  await page.goto("/pl");
  await expect(page.locator("html")).toHaveAttribute("data-intro", "");
  await expect(page.locator(".intro")).toBeHidden();
});

test("nagłówek zostaje widoczny i wskazuje sekcję na ekranie", async ({
  page,
  isMobile,
}) => {
  await page.route("**/*.glb", () => {});
  await page.goto("/pl");
  await page.evaluate(() =>
    document.querySelector("#faq")?.scrollIntoView({ block: "center" }),
  );
  const header = page.locator("header");
  await expect(header).toBeInViewport();
  await expect(header).toHaveCSS("translate", "none");
  if (isMobile) {
    await page.getByRole("button", { name: pl.a11y.menu }).click();
    await expect(
      page.getByRole("dialog").getByRole("link", { name: "FAQ" }),
    ).toHaveAttribute("aria-current", "true");
  } else {
    await expect(
      header.getByRole("link", { name: "FAQ", exact: true }),
    ).toHaveAttribute("aria-current", "true");
  }
});

test("przy ograniczonym ruchu strona nie ma animacji", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.route("**/*.glb", () => {});
  await page.goto("/pl");
  await expect(page.locator("html")).not.toHaveAttribute("data-motion");
  await expect(page.locator(".intro")).toBeHidden();
  await expect(page.locator("#faq [data-reveal]").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await context.close();
});

test("strona wysyła nagłówki bezpieczeństwa", async ({ request }) => {
  const response = await request.get("/pl");
  const headers = response.headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
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

for (const path of [
  "/",
  "/pl",
  "/portfolio",
  "/pl/portfolio",
  "/privacy",
  "/pl/polityka-prywatnosci",
]) {
  test(`brak naruszeń WCAG 2.2 AA na ${path}`, async ({ page }) => {
    // Pełny audyt długiej strony przy równoległych testach WebGL trwa dłużej.
    test.slow();
    await expectNoAxeViolations(page, path);
  });
}

test("brak naruszeń WCAG 2.2 AA w oknie projektu", async ({ page }) => {
  test.slow();
  const t = pl.work;
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/*.glb", () => {});
  await page.goto("/pl#work");
  const work = page.locator("#work");
  // Przy ograniczonym ruchu pasek startuje zatrzymany.
  await expect(
    work.getByRole("button", { name: t.controls.play }),
  ).toBeVisible();
  await work
    .getByRole("button", { name: new RegExp(t.items[0].title) })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const results = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
