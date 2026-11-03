import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/data/services";

describe("ServiceCard", () => {
  it("renders service name and learn more link", () => {
    const service = services[0];
    render(<ServiceCard service={service} />);

    expect(screen.getByRole("heading", { name: service.name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /learn more/i })).toHaveAttribute(
      "href",
      `/services/${service.slug}`,
    );
  });
});
