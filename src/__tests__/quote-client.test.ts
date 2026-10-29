import { afterEach, describe, expect, it, vi } from "vitest";
import { QUOTE_ENDPOINT, submitQuote } from "@/lib/quote-client";

describe("submitQuote", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("wysyła wszystkie załączniki jako files[], żeby PHP dostał każdy plik", async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({ status: "success", name: "Paweł" }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const data = new FormData();
    data.set("name", "Paweł");
    data.append("files", new File(["a"], "logo.svg"));
    data.append("files", new File(["b"], "brief.pdf"));

    const state = await submitQuote({ status: "idle" }, data);

    expect(state).toEqual({ status: "success", name: "Paweł" });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    const body = init.body as FormData;
    expect(url).toBe(QUOTE_ENDPOINT);
    expect(body.get("name")).toBe("Paweł");
    expect(body.getAll("files[]").map((f) => (f as File).name)).toEqual([
      "logo.svg",
      "brief.pdf",
    ]);
    expect(body.has("files")).toBe(false);
  });

  it("zwraca błąd wysyłki, gdy serwer nie odpowiada poprawnie", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 500 })),
    );
    expect(await submitQuote({ status: "idle" }, new FormData())).toEqual({
      status: "failed",
    });
  });
});
