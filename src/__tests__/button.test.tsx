import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renderuje i obsługuje kliknięcie", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Kliknij</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Kliknij" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
