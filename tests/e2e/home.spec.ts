import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("strona główna się renderuje", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/GlowBox Lab/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("formularz kontaktowy waliduje i wysyła", async ({ page }) => {
  await page.goto("/#kontakt");
  await page.getByRole("button", { name: "Wyślij" }).click();
  await expect(page.getByText("Podaj imię")).toBeVisible();

  await page.getByLabel("Imię").fill("Paweł");
  await page.getByLabel("E-mail").fill("pawel@example.com");
  await page.getByLabel("Wiadomość").fill("Chcę zamówić stronę internetową.");
  await page.getByRole("button", { name: "Wyślij" }).click();
  await expect(page.getByText("Dzięki, Paweł!")).toBeVisible();
});

test("przełącznik motywu działa", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const before = await html.getAttribute("class");
  await page.getByRole("button", { name: "Przełącz motyw" }).click();
  await expect(html).not.toHaveAttribute("class", before ?? "");
});

test("brak naruszeń dostępności (WCAG 2.2 AA)", async ({ page }) => {
  await page.goto("/");
  // Przewiń stronę i poczekaj na koniec animacji, żeby axe mierzył stan końcowy.
  await page.keyboard.press("End");
  await expect
    .poll(() =>
      page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('[style*="opacity"]')].every(
          (el) => getComputedStyle(el).opacity === "1",
        ),
      ),
    )
    .toBe(true);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
