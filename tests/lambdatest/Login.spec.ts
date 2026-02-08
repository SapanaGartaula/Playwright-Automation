import { test, expect, Page } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("Lambdatest Login", () => {
  async function loginUser(page: Page, email: string, password: string) {
    await page.goto("/?route=account/login");
    await page.getByLabel("E-Mail Address").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
  }

  test("positive login with valid credentials", async ({ page }) => {
    await loginUser(page, process.env.Lamb_Email!, process.env.Lamb_Password!);
    await expect(page.getByRole("heading", { level: 2 })).toContainText("My Account");
  });

  test("negative login with wrong password", async ({ page }) => {
    await loginUser(page, process.env.Lamb_Email!, "WrongPass123");
    await expect(page.getByText("Warning: No match for E-Mail Address and/or Password.")).toBeVisible();
  });

  test("negative login with invalid email format", async ({ page }) => {
    await loginUser(page, "invalid-email", "Password123!");
    await expect(page.getByText("Warning: No match for E-Mail Address and/or Password")).toBeVisible();
  });

  test("negative login with empty fields", async ({ page }) => {
    await loginUser(page, "", "");
    await expect(page.getByText("Warning: No match for E-Mail Address and/or Password.")).toBeVisible();
  });
});
