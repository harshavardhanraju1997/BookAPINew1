const { test, expect } = require("@playwright/test");

test("First Playwright test without page fixture", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/#/index");
  console.log(await page.title());
  await expect(page).toHaveTitle("Selenium, API Testing, Software Testing & More QA Tutorials | Rahul Shetty Academy");
});

test("First Playwright test with page fixture", async ({ browser, page }) => {
  //   const context = await browser.newContext();Page will give all
  //   const page = await context.newPage();Page will give all
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("@web Validate error message", async ({browser,  page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await page.locator("input#username").fill("rahulshettyacademy");
  //await page.locator("input[name='password']").fill("learning")
  await page.locator("input[name='password']").fill("ffgggf");
  await page.locator("input[name='signin']").click();
  const errorMessage = await page.locator("[style*='block']").textContent();
  const errorMessageLocator = await page.locator("[style*='block']");
  expect(errorMessageLocator).toContainText("username/password.");
  expect(errorMessageLocator).toHaveText("Incorrect username/password.");
});

test("Login", async ({ browser, page }) => {
  const userName = page.locator("input#username");
  const password = page.locator("input[name='password']");
  const signInButton = page.locator("input[name='signin']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.fill("rahulshettyacademy");
  await userName.clear();
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await signInButton.click();
  const itemheaders = page.locator("h4.card-title>a");

  // const itemHeaderstext=await itemheaders.first().textContent()
  // const itemHeaderstext2=await itemheaders.nth(2).textContent()
  // console.log(itemHeaderstext);
  // console.log(itemHeaderstext2);
  const alltitles = await itemheaders.allTextContents();
  console.log(alltitles);
});
