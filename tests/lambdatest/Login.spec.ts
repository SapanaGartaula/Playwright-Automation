import { test, expect, Page } from "@playwright/test";
import Testdata from '../Fixtures/Testdata.json';


test.describe("Lambdatest Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?route=account/login");
  });
  test("verify login  and cart functionality", async ({ page }) => {
    await page.getByLabel("E-Mail Address").fill(process.env.Login_Email!);
    await page.getByLabel("Password").fill(process.env.Login_Password!);
    await page.getByRole("button", { name: "Login" }).click();
    await expect( page.getByRole("heading", { level: 2, name: "My Account" }), ).toBeVisible();
    await page.fill("input[name='search']", "HP LP3065");
  await page.press("input[name='search']", "Enter");

  // Wait for search results to load
  await page.waitForLoadState("networkidle");
  const firstProduct = page.locator(".product-layout").first();

  // Hover on product 
  await firstProduct.hover();

  // Click 'Add to Cart' button
  const addToCartButton = firstProduct.locator("button[title='Add to Cart']");
  await addToCartButton.click();
  await page.evaluate(() => window.scrollTo(0, 0));

  // Click it
  await page.locator(".toast-body >> text=Checkout").click();

  await expect(page).toHaveURL(/\/checkout/);
  
  // await page.locator('div:nth-child(3) > .custom-control').first().click();
  await page.fill("#input-telephone", Testdata.checkout.Check_Telephone);
 await page.locator('div:nth-child(3) > .custom-control').first().click();
  await page.fill("#input-payment-firstname", Testdata.checkout.Check_FirstName);
  await page.fill("#input-payment-lastname", Testdata.checkout.Check_LastName);
  await page.fill("#input-payment-company", Testdata.checkout.Check_Company);
  await page.fill("#input-payment-address-1",Testdata.checkout.Check_Address1);
  await page.fill("#input-payment-address-2", Testdata.checkout.Check_Address2);
  await page.fill("#input-payment-city", Testdata.checkout.Check_City);
  await page.fill("#input-payment-postcode",Testdata.checkout.Check_PostCode);

  
// Country dropdown
const countryDropdown = page.locator("select[name='country_id']");
await countryDropdown.selectOption({ label: "Nepal" });

const regionDropdown = page.locator("select[name='zone_id']");
await regionDropdown.waitFor({ state: 'visible' });

// Select Bagmati
await regionDropdown.selectOption({ label: "Bagmati" });
await page.getByText("I have read and agree to the Terms & Conditions").click();
await page.getByRole("button", { name: "Continue" }).click();




await expect(page).toHaveURL(/extension\/maza\/checkout\/confirm/);
await expect(page.getByRole("heading", { name: "Confirm Order" })).toBeVisible();

await expect( page.getByRole("button", { name: "Confirm Order" })).toBeVisible({ timeout: 10000 }); 

await page.getByRole("button", { name: "Confirm Order" }).click();
await expect(page.getByText("Your order has been placed!")).toBeVisible();

  });

 
});
