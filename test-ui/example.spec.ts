import { expect } from "@playwright/test";
import { test } from "./coverage_wrapper";

test("find-watman", async ({ page }) => {  
  await page.goto("/");
  await expect(page.getByAltText("This is watman")).toBeInViewport();
});

test("redirect", async ({ page }) => {
  await page.goto("/");

  const flex = page.locator("#site-a");
  await flex.click();
  await expect(page).toHaveURL("/site_a.html");
})