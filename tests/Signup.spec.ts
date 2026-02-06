import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";

test.describe("Demoblaze", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("verify signup functionality", async ({ page }) => {
    // signup process
    await page.click("#signin2");
    await page.waitForSelector("#signInModal");

    await page.fill("#sign-username", process.env.Demo_Username!);
    await page.fill("#sign-password", process.env.Demo_Password!);

    await page.getByRole("button", { name: "Sign up" }).click();
    page.on("dialog", async (dialog) => {
      const alertMessage = dialog.message();
      console.log("Alert message is:", alertMessage);

      expect(alertMessage).toMatch(
        /Sign up successful|This user already exist\./,
      );

      await dialog.accept();
    });
  });

  test("verify login functionality and cart added successfully", async ({
    page,
  }) => {
    // Login process
    await page.click("#login2");
    await page.waitForSelector("#logInModal");

    await page.fill("#loginusername", process.env.Demo_Username!);
    await page.fill("#loginpassword", process.env.Demo_Password!);

    await page.getByRole("button", { name: "Log in" }).click();

    const welcome = page.locator("#nameofuser");
    await expect(welcome).toHaveText(`Welcome ${process.env.Demo_Username!}`);

    // Function to add product
    async function addProduct(name: string) {
      await page.getByRole("link", { name }).click();
      await page.getByRole("link", { name: "Add to cart" }).click();

      const dialog = await page.waitForEvent("dialog");
      await dialog.accept();

      await page.getByRole("link", { name: "Home" }).click();
    }

    // Add 3 products
    await addProduct("Samsung galaxy s6");
    await addProduct("Nokia lumia 1520");
    await addProduct("Nexus 6");

    await page.getByRole("link", { name: "Cart" }).click();

    // Verify items in cart
    await expect(page.locator("#tbodyid")).toContainText("Samsung galaxy s6");
    await expect(page.locator("#tbodyid")).toContainText("Nokia lumia 1520");
    await expect(page.locator("#tbodyid")).toContainText("Nexus 6");

    await page.goto("/cart.html");

    // Delete

    await page.getByRole("link", { name: "Delete" }).first().click();
    
    await page.getByRole("link", { name: "Delete" }).last().click();
    await page.getByRole("link", { name: "Home" }).click();
    await page.goto("/cart.html");
    


// place order
    await page.getByRole("button", { name: "Place Order" }).click();
    const OrderModal = page.locator("#orderModal");
    await OrderModal.waitFor({ state: "visible" });

    await page.getByRole("textbox", { name: "Name" }).fill("Sapana Gartaula");
    await page.getByRole("textbox", { name: "Country" }).fill("Nepal");
    await page.getByRole("textbox", { name: "City" }).fill("Damak");
    await page.getByRole("textbox", { name: "Credit card" }).fill("167783");
    await page.getByRole("textbox", { name: "Month" }).fill("02");
    await page.getByRole("textbox", { name: "Year" }).fill("2026");

    await page.getByRole("button", { name: "Purchase" }).click();
    await expect(page.locator(".sweet-alert")).toContainText(
      "Thank you for your purchase!",
    );
    await page.getByRole("button", { name: "OK" }).click();
  });
});
