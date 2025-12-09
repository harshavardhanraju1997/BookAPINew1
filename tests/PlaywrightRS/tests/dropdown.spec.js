const { test, expect } = require("@playwright/test");

// test.describe.configure({ mode: "parallel" }); //--parallel
test.describe.configure({ mode: "serial" }); //in this case tests will run one by one and if one fails next tests will not run
test("Static Dropdowns test", async ({ browser, page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("input#username");
  const password = page.locator("input[name='password']");
  const dropdown = page.locator("select.form-control");
  const signInButton = page.locator("input[name='signin']");

  await dropdown.selectOption("Teacher");
  await dropdown.selectOption("Consultant");
  await dropdown.selectOption("stud");
  await dropdown.selectOption("consult");
});

test("Checkbox test", async ({ browser, page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("input#username");
  const password = page.locator("input[name='password']");
  const dropdown = page.locator("select.form-control");
  const signInButton = page.locator("input[name='signin']");
  //
  const loginPersonType = "User";
  const radioButon = page.locator(`//span[normalize-space(text())='${loginPersonType}']//following-sibling::span[@class='checkmark']`);
  //span[text()='Admin']
  await radioButon.click();
  const okBtn = page.locator("button#okayBtn");
  await okBtn.click();
  const check1 = expect(radioButon).toBeChecked(); //this return promise
  console.log("==========================================");
  console.log(check1);
  console.log("==========================================");

  const check2 = await radioButon.isChecked(); //this return boolean
  console.log(check2);
});

test("Checkboxes test", async ({ browser, page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const termsCheckBox = page.locator("input#terms");

  await termsCheckBox.click();
  expect(termsCheckBox).toBeChecked();

  await termsCheckBox.uncheck();

  console.log("==========================================");
  console.log(await termsCheckBox.isChecked());
  console.log("==========================================");

  //await expect(termsCheckBox).isChecked().toBeFalsy()

  expect(await page.locator("input#terms").isChecked()).toBeFalsy(); ///here await is inside expect because svtion performed inside
  //expect(await termsCheckBox.isChecked()).toBeFalsy();

  ///blinking text
  const documentLink = page.locator("[href*='documents-request']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("Child Window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [page2] = await Promise.all([context.waitForEvent("page"), documentLink.click()]);
  const texxxt = await page2.locator(".red").textContent();
  console.log(texxxt);

  const arrayText = texxxt.split("@");
  console.log(`arrayText[0]:::${arrayText[0]}`);
  console.log(`arrayText[1]:::${arrayText[1]}`);
  const domain = arrayText[1].split(" ")[0];
  console.log(`domain:::${domain}`);

  await page.bringToFront(); //to bring focus
  const userName = page.locator("input#username");
  await userName.fill(domain);
  await page2.bringToFront(); //to bring focus

  await page.bringToFront(); //to bring focus
  console.log("---------------->" + (await userName.inputValue())); //gives what we filled in the textbox
});
