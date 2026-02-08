import { test, expect, Page } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("Lambdatest", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?route=account/register");
  });

  // ✅ Helper function with proper type
  async function registerUser(page: Page, email: string) {
    await page.getByRole("textbox", { name: "First Name" }).fill(process.env.Lamb_FirstName!);
    await page.getByRole("textbox", { name: "Last Name" }).fill(process.env.Lamb_LastName!);
    await page.getByRole("textbox", { name: "E-Mail" }).fill(email);
    await page.getByRole("textbox", { name: "Telephone" }).fill(process.env.Lamb_Telephone!);
    await page.fill("#input-password", process.env.Lamb_Password!);
    await page.fill("#input-confirm", process.env.Lamb_PasswordConfirm!);
    await page.locator('#content div').filter({ hasText: 'I have read and agree to the' }).nth(2).click();
    await page.getByRole("button", { name: "Continue" }).click();
  }

  test("positive register with new email", async ({ page }) => {
    const uniqueEmail = `user_${Date.now()}@example.com`;
    await registerUser(page, uniqueEmail);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Your Account Has Been Created!");
  });

  test("negative register with already used email", async ({ page }) => {
  await registerUser(page, "sapana123@gmail.com");
  await expect(page.getByText("Warning: E-Mail Address is already registered!")).toBeVisible();
});

  test("negative register with invalid email format", async ({ page }) => {
  await registerUser(page, "invalid-email");

  // ✅ Assert that we are still on the register page (no success heading)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Register Account");
  // ✅ Optionally check that the email field still contains the invalid value
  await expect(page.locator("#input-email")).toHaveValue("invalid-email");
});

});
