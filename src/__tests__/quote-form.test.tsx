import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { QuoteForm } from "@/components/site/quote-form";
import { pl } from "@/content/pl";

const submitQuote = vi.hoisted(() => vi.fn());
vi.mock("@/app/actions/quote", () => ({ submitQuote }));

describe("QuoteForm", () => {
  beforeEach(() => {
    submitQuote.mockReset();
    submitQuote.mockResolvedValue({ status: "success", name: "Paweł" });
  });

  it("pokazuje błędy i nie wysyła pustego formularza", async () => {
    const user = userEvent.setup();
    render(<QuoteForm dict={pl} />);
    await user.click(
      screen.getByRole("button", { name: pl.quote.form.submit }),
    );
    expect(await screen.findByText(pl.quote.errors.summary)).toBeVisible();
    expect(screen.getByText(pl.quote.errors.name)).toBeVisible();
    expect(screen.getByText(pl.quote.errors.size)).toBeVisible();
    expect(screen.getByLabelText(pl.quote.form.name)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(submitQuote).not.toHaveBeenCalled();
  });

  it("odrzuca nieobsługiwany plik", async () => {
    const user = userEvent.setup({ applyAccept: false });
    render(<QuoteForm dict={pl} />);
    const input = screen.getByLabelText(pl.quote.form.filesDrop, {
      exact: false,
    });
    await user.upload(input, new File(["x"], "plik.exe"));
    expect(
      await screen.findByText(
        pl.quote.errors.fileType.replace("{file}", "plik.exe"),
      ),
    ).toBeVisible();
  });

  it("wysyła poprawne zapytanie z plikiem i pokazuje podziękowanie", async () => {
    const user = userEvent.setup();
    render(<QuoteForm dict={pl} />);
    const f = pl.quote.form;
    await user.type(screen.getByLabelText(f.name), "Paweł");
    await user.type(screen.getByLabelText(f.email), "pawel@example.com");
    await user.type(screen.getByLabelText(f.width), "200");
    await user.type(screen.getByLabelText(f.height), "150");
    await user.type(screen.getByLabelText(f.depth), "60");
    await user.click(screen.getByRole("button", { name: f.increase }));
    await user.type(
      screen.getByLabelText(f.description),
      "Logo kawiarni na ścianę za ladą, białe światło.",
    );
    await user.upload(
      screen.getByLabelText(f.filesDrop, { exact: false }),
      new File(["<svg/>"], "logo.svg", { type: "image/svg+xml" }),
    );
    await user.click(screen.getByRole("button", { name: f.submit }));

    expect(
      await screen.findByText(f.successTitle.replace("{name}", "Paweł")),
    ).toBeVisible();
    expect(submitQuote).toHaveBeenCalledOnce();
    const data = submitQuote.mock.calls[0][1] as FormData;
    expect(data.get("quantity")).toBe("2");
    expect(data.get("depth")).toBe("60");
    expect(data.get("sizeUnsure")).toBeNull();
    expect(data.get("locale")).toBe("pl");
    expect((data.getAll("files")[0] as File).name).toBe("logo.svg");
  });
});
