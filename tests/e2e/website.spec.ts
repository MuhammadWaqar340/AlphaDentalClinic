import { expect, test } from "@playwright/test";

test.describe("Alpha Dental Clinic website", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: /your trusted dental care partner in johar town/i,
      }),
    ).toBeVisible();
  });

  test("primary navigation works", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: /open menu/i }).click();
      await page
        .getByRole("navigation", { name: "Mobile" })
        .getByRole("link", { name: "About Us" })
        .click();
    } else {
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: "About Us" })
        .click();
    }
    await expect(page).toHaveURL(/\/about/);
    await expect(
      page.getByRole("heading", { name: /about alpha dental clinic/i }),
    ).toBeVisible();
  });

  test("services overview and detail pages work", async ({ page }) => {
    await page.goto("/services");
    await expect(
      page.getByRole("heading", {
        name: /comprehensive dental care for a healthy smile/i,
      }),
    ).toBeVisible();

    await page
      .getByRole("link", { name: /learn more/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/services\//);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("appointment form validates required fields", async ({ page }) => {
    await page.goto("/appointment");
    await page.getByRole("button", { name: /request appointment/i }).click();
    await expect(page.getByRole("alert").first()).toBeVisible();
  });

  test("invalid appointment submissions are rejected by the API", async ({ request }) => {
    const response = await request.post("/api/appointments", {
      data: {
        name: "A",
        phone: "123",
        service: "not-a-service",
        preferredDate: "2020-01-01",
        preferredTime: "99:99",
      },
    });
    expect(response.status()).toBe(400);
  });

  test("successful appointment request shows confirmation", async ({ page }) => {
    await page.route("**/api/appointments", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message:
            "Thank you. Your appointment enquiry has been received. The clinic will confirm availability.",
          mode: "development",
        }),
      });
    });

    await page.goto("/appointment");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateValue = tomorrow.toISOString().slice(0, 10);

    await page.getByLabel(/patient name/i).fill("Ayesha Khan");
    await page.getByLabel(/phone number/i).fill("03415169411");

    await page.locator("#service").click();
    await page.getByRole("option", { name: "General Dentistry" }).click();

    await page.getByLabel(/preferred date/i).fill(dateValue);

    await page.locator("#preferredTime").click();
    await page.getByRole("option", { name: "10:00" }).click();

    await page.getByRole("button", { name: /request appointment/i }).click();
    await expect(page.getByRole("heading", { name: /enquiry received/i })).toBeVisible({
      timeout: 15_000,
    });
  });

  test("contact information displays correctly", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.locator("#main-content").getByRole("link", { name: /0341 5169411/ }),
    ).toBeVisible();
    await expect(
      page
        .locator("#main-content")
        .getByText(/johar town/i)
        .first(),
    ).toBeVisible();
  });

  test("mobile navigation works", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile project only");
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "Contact" })
      .click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test("primary CTAs work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Book Appointment" }).first().click();
    await expect(page).toHaveURL(/\/appointment/);
  });

  test("not-found page works", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByRole("heading", { name: /page not found/i })).toBeVisible();
  });
});

test("rate limiting returns HTTP 429 when Redis is configured", async ({ request }) => {
  test.skip(
    !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN,
    "Requires Upstash credentials",
  );

  const payloads = Array.from({ length: 6 }, (_, index) => ({
    name: `Rate Limit User ${index}`,
    phone: "03415169411",
    service: "general-dentistry",
    preferredDate: new Date(Date.now() + 86_400_000).toISOString().slice(0, 10),
    preferredTime: "10:00",
    website: "",
  }));

  let saw429 = false;
  for (const payload of payloads) {
    const response = await request.post("/api/appointments", { data: payload });
    if (response.status() === 429) {
      saw429 = true;
      expect(response.headers()["retry-after"]).toBeTruthy();
      break;
    }
  }

  expect(saw429).toBe(true);
});
