import { expect, test } from "@playwright/test";

test("loads Brandon Williams portfolio home page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Brandon Williams builds clear, reliable software for the web/i,
    }),
  ).toBeVisible();
  await expect(page.getByText("Tokyo, Japan").first()).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /From service and education into software engineering/i,
    }),
  ).toBeVisible();
  await expect(page.getByText("VMware", { exact: true })).toBeVisible();
  await expect(page.getByText("Amazon", { exact: true })).toHaveCount(3);
});

test("exposes working contact links", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /Email Brandon/i })).toHaveAttribute(
    "href",
    "mailto:williamsb600@gmail.com",
  );
  await expect(page.getByRole("link", { name: /View LinkedIn/i })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/brandon-williams-8206426a",
  );
});

test("answers an AI Brandon career question", async ({ page }) => {
  await page.route("**/api/ai-brandon", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        answer: "Brandon has software engineering experience at VMware and Amazon.",
      }),
    });
  });

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Ask AI Brandon about his career/i }),
  ).toBeVisible();
  await page
    .getByLabel("Ask about Brandon's career")
    .fill("What engineering experience does Brandon have?");
  await page.getByRole("button", { name: "Ask" }).click();

  await expect(
    page.getByText("What engineering experience does Brandon have?"),
  ).toBeVisible();
  await expect(
    page.getByText("Brandon has software engineering experience at VMware and Amazon."),
  ).toBeVisible();
});
