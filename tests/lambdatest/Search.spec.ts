import { test, expect } from "@playwright/test";

test("verify search with existing functionality", async ({ page }) => {
  await page.goto("/home");

  await page.getByRole("textbox", { name: "Search For Products" }).fill("iPhone");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByRole("link", { name: "iPhone" }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("iPhone");
});


test("verify search with non-existing product", async({page})=> {
   await page.goto("/home");
   await page.getByRole("textbox", {name : "Search For Products"}).fill("cup");
   await page.getByRole("button", {name : "Search"}).click();
    await expect(page.getByText("There is no product that matches the search criteria.")).toBeVisible();
    });

