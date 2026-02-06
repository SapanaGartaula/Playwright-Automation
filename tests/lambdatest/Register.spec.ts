import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";

test.describe("Lambadatest", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("verify Register functionality", async ({ page }) => {
    await page.goto(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/register",
    );
    await page.getByRole("textbox", { name: "First Name" }).fill(process.env.Lamb_FirstName!);
    await page.getByRole("textbox", { name: "Last Name" }).fill(process.env.Lamb_LastName!);
    await page.getByRole("textbox", { name: "E-Mail" }).fill(process.env.Lamb_Email!);
    await page.getByRole("textbox", { name: "Telephone" }).fill(process.env.Lamb_Telephone!);
   await page.fill("#input-password", process.env.Lamb_Password!);
   await page.fill("#input-confirm", process.env.Lamb_PasswordConfirm!);


    // await page.getByRole("textbox", { name: "Password" }).fill(process.env.Lamb_Password!);
    // await page.getByRole("textbox", { name: "Password Confirm" }).fill(process.env.Lamb_PasswordConfirm!);



  await page.locator('input[name="agree"]').check();
  await page.getByRole("button", { name: "Continue" }).click();

  });
});
