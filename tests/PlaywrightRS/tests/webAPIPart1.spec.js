const { test, expect, request } = require("@playwright/test");

const loginpayload = { userEmail: "automationharsha7@gmail.com", userPassword: "Welcome@123" };
let token;

const orderpayload = { orders: [{ country: "Cuba", productOrderedId: "68a961959320a140fe1ca57e" }] };
let orderID;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginpayload });
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log("Token is---------->" + token);

  //Order creation
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
    data: orderpayload,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  const orderResponseJson = await orderResponse.json();
  orderID = orderResponseJson.orders[0];
  console.log("Order ID------->" + orderID);
});

test.beforeEach(() => {});

test.only("App tests", async ({ browser, page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client");
  // console.log(await page.title());
  const usernameValue = "automationharsha7@gmail.com";

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
