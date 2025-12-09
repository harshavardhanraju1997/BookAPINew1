const { test, expect, request } = require("@playwright/test");
const { json } = require("stream/consumers");

const loginpayload = { userEmail: "automationharsha7@gmail.com", userPassword: "Welcome@123" };
let token;

const orderpayload = { orders: [{ country: "Cuba", productOrderedId: "68a961959320a140fe1ca57e" }] };
let orderID;
const fakePayLoadOrders = { message: "No Product in Cart" };

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

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async (route) => {
    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(fakePayLoadOrders);
    route.fulfill({
      response,
      body,
    });

    //intercepting response - API response->Fake response->browser->render
  });
  // await page.pause();
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  // await page.pause();
  const text = await page.locator(".mt-4").textContent();
  console.log(text);

  const orderRows = await page.locator("tbody tr");
});

//   // expect(allOrderIds).conta
