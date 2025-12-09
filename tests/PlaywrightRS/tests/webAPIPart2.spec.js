const { test, expect, request } = require("@playwright/test");

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("input#userEmail");
  const password = page.locator("input#userPassword");
  const signInButton = page.locator("input#login");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  await userName.fill("automationharsha7@gmail.com");
  await password.fill("Welcome@123");
  await signInButton.click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("App tests111", async () => {
  const page = await webContext.newPage();
  await page.pause();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.pause();
  await page.locator("button[routerlink*='myorders']").click();

  const orderRows = await page.locator("tbody tr");
  const counssst = await orderRows.count();
  for (let i = 0; i < counssst; i++) {
    const rowOrderId = await orderRows.nth(i).locator("th").textContent();
    console.log(`🔍 rowOrderId: "${rowOrderId}"`);
    console.log(`🧾 orderID: "${orderID.trim()}"`);
    if (orderID.includes(rowOrderId)) {
      await orderRows.nth(i).locator("button.btn-primary").click();
      //
      break;
    }
  }

  //   // expect(allOrderIds).conta
});
