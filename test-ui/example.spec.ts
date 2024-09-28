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

test("content", async ({ page }) => {
  await page.goto("https://www.seznam.cz", {timeout : 20000});
  const logo = page.locator(".content");
  await expect(logo).toBeVisible({ timeout: 30000 });
});

test("email-login-button", async ({ page }) => {
  await page.goto("https://www.seznam.cz");
  const loginButton = page.locator('#login');
  await expect(loginButton).toBeInViewport({ timeout: 30000 });
});

test("article", async ({ page }) => {
  await page.goto("https://www.seznam.cz");
  const article = page.locator('.article').first();
  await expect(article).toBeInViewport({ timeout: 30000 });
});

test("search", async ({ page }) => {
  await page.goto("https://www.seznam.cz");
  const search = page.locator('.search-form');
  await expect(search).toBeInViewport({ timeout: 30000 });
});