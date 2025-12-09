const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");

const loginpayload = { userEmail: "automationharsha7@gmail.com", userPassword: "Welcome@123" };
let response;

const orderpayload = { orders: [{ country: "Cuba", productOrderedId: "68a961959320a140fe1ca57e" }] };
let orderID;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginpayload);
  response = await apiUtils.createOrder(orderpayload);
});

test("UsingApi", async ({ browser, page }) => {

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");

  const usernameValue = "automationharsha7@gmail.com";

  await page.locator("button[routerlink*='myorders']").click();

  const orderRows = await page.locator("tbody tr");
  const counssst = await orderRows.count();
  for (let i = 0; i < counssst; i++) {
    const rowOrderId = await orderRows.nth(i).locator("th").textContent();
    console.log(`🔍 rowOrderId: "${rowOrderId}"`);
    console.log(`🧾 orderID: "${response.orderID.trim()}"`);
    if (response.orderID.includes(rowOrderId)) {
      await orderRows.nth(i).locator("button.btn-primary").click();

      break;
    }
  }

});
