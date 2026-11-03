import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AppointmentForm } from "@/components/appointment/appointment-form";

describe("AppointmentForm", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<AppointmentForm />);

    await user.click(screen.getByRole("button", { name: /request appointment/i }));

    await waitFor(() => {
      expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    });
  });

  it("keeps submit enabled and surfaces server errors", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Unable to submit your request." }),
      }),
    );

    render(<AppointmentForm />);

    expect(screen.getByRole("button", { name: /request appointment/i })).toBeEnabled();

    await user.type(screen.getByLabelText(/patient name/i), "Ayesha Khan");
    await user.type(screen.getByLabelText(/phone number/i), "03415169411");
    await user.click(screen.getByRole("button", { name: /request appointment/i }));

    await waitFor(() => {
      expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    });
  });
});
