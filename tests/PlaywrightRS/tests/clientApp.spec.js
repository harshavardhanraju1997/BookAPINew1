const { test, expect } = require("@playwright/test");

test("Login", async ({ browser, page }) => {
  const userName = page.locator("input#userEmail");
  const password = page.locator("input#userPassword");
  const signInButton = page.locator("input#login");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  await userName.fill("automationharsha7@gmail.com");
  await password.fill("Welcome@123");
  await signInButton.click();
  await page.waitForLoadState("networkidle"); //sometimnes works
  const itemHeaderTexts = page.locator("h5>b");
  itemHeaderTexts.first().waitFor(); //instead of network idle use this

  const alltitles = await itemHeaderTexts.allTextContents();
  console.log(alltitles);
  expect(alltitles).toContain("ADIDAS ORIGINAL");
});

test("App tests", async ({ browser, page }) => {
  const userName = page.locator("input#userEmail");
  const password = page.locator("input#userPassword");
  const signInButton = page.locator("input#login");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  const usernameValue = "automationharsha7@gmail.com";
  await userName.fill("automationharsha7@gmail.com");
  await password.fill("Welcome@123");
  await signInButton.click();
  await page.waitForLoadState("networkidle"); //sometimnes works
  const itemHeaderTexts = page.locator("h5>b");
  itemHeaderTexts.first().waitFor(); //instead of network idle use this

  const alltitles = await itemHeaderTexts.allTextContents();
  console.log(alltitles);
  expect(alltitles).toContain("ADIDAS ORIGINAL");
  const products = page.locator("div.card-body");
  const productName = "iphone 13 pro";
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  const cartButtonTop = page.locator("button[routerlink*=cart]");
  await cartButtonTop.click();
  page.locator(".cart li").waitFor();
  const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  expect(bool).toBeTruthy();
  console.log(bool);

  await page.locator("text=Checkout").click();

  // await page.locator("input[placeholder='Select Country']").pressSequentially("ind", { delay: 150 });
  await page.locator("input[placeholder='Select Country']").pressSequentially("ind");

  const dropdown = page.locator("section[class*='ta-results']");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();

    if (text.trim() === "India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  const textContent = await page.locator(".details__user label").textContent();
  await expect(textContent).toEqual(usernameValue);
  //or
  expect(page.locator(".details__user label")).toHaveText(usernameValue);

  await page.locator("text=Place Order").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderID = await page.locator("td>label.ng-star-inserted").textContent();
  console.log(orderID);
  await page.locator("button[routerlink='/dashboard/myorders']").click();
  page.waitForLoadState("networkidle");
  await page.locator("tbody th").first().waitFor();
  const allOrderIds = await page.locator("tbody th").allTextContents();

  console.log(`All order Id's using tildeee ${allOrderIds}`);
  console.log("All Order id's:", allOrderIds);

  const orderRows = await page.locator("tbody tr");
  const counssst = await orderRows.count();
  for (let i = 0; i < counssst; i++) {
    const rowOrderId = await orderRows.nth(i).locator("th").textContent();
    console.log(`🔍 rowOrderId: "${rowOrderId}"`);
    console.log(`🧾 orderID: "${orderID.trim()}"`);
    if (orderID.includes(rowOrderId)) {
      await orderRows.nth(i).locator("button.btn-primary").click();
      break;
    }
  }

  // expect(allOrderIds).conta
});
