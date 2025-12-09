const { test, expect } = require("@playwright/test");

test("Playwright Special Locators", async ({ browser, page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByLabel("Check me out if you Love IceCreams!").click();

  await page.getByLabel("Employed").check();

  await page.getByLabel("Gender").selectOption("Female");

  await page.getByPlaceholder("Password").fill("hiiiii");
  //   await page.pause()
  await page.getByRole("button", { name: "Submit" }).click();
  const textVisible = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  console.log(textVisible);

  await page.getByRole("link", { name: "Shop" }).click();

  await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();
});
