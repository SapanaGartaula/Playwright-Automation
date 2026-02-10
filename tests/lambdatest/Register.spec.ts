import { test, expect, Page } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("Lambdatest", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?route=account/home");
  });


  test("verify register functionality", async({page})=> {
    await page.getByRole("button", { name: "My Account" }).click();
    await page.getByRole("link", { name: "Register" }).click();
    await page.getByRole("textbox", { name: "First Name" }).fill(process.env.Lamb_FirstName!);
    await page.getByRole("textbox", { name: "Last Name" }).fill(process.env.Lamb_LastName!);
    await page.getByRole("textbox", { name: "E-Mail" }).fill(process.env.Lamb_Email!);
    await page.getByRole("textbox", { name: "Telephone" }).fill(process.env.Lamb_Telephone!);
    await page.fill("#input-password", process.env.Lamb_Password!);
    await page.fill("#input-confirm", process.env.Lamb_PasswordConfirm!);
    await page.locator('#content div').filter({ hasText: 'I have read and agree to the' }).nth(2).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).toBeVisible();

  });
});
