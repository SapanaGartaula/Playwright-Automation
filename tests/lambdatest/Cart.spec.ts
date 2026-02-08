import { test, expect } from "@playwright/test";

test("Verify cart functionality", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/");

  // add iPod Nano
  const productCard = page.locator("h4", { hasText: "iPod Nano" }).first();
  await productCard.hover();
  await productCard.locator("xpath=../..").locator("button[title='Add to Cart']").first().click({ force: true });
  console.log("iPod Nano added to cart from card");


});




// // reusable function
// async function addProductToCart(page: Page, productName: string) {
//   const productCard = page.locator("h4", { hasText: productName }).first();
//   await productCard.scrollIntoViewIfNeeded();
//   await productCard.hover();
//   const cartButton = productCard
//     .locator("xpath=../..")
//     .locator("button[title='Add to Cart']")
//     .first();
//   await cartButton.click({ force: true });
//   console.log(`${productName} added to cart from card`);
// }

// test("Verify cart functionality - multiple products", async ({ page }) => {
//   await page.goto("https://ecommerce-playground.lambdatest.io/");

//   // add products using function
//   await addProductToCart(page, "iPod Nano");
//   await addProductToCart(page, "iMac");
//   await addProductToCart(page, "HTC Touch HD");
// });
