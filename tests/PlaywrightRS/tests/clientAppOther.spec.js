const { test, expect } = require("@playwright/test");

test("App tests", async ({ browser, page }) => {
  const userName = page.getByPlaceholder("email@example.com");
  const password = page.getByPlaceholder("enter your passsword");
  const signInButton = page.getByRole("button", { name: "Login" });
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());
  const usernameValue = "automationharsha7@gmail.com";
  await userName.fill("automationharsha7@gmail.com");
  await password.fill("Welcome@123");
  await signInButton.click();
  await page.waitForLoadState("networkidle"); //sometimnes works
  const itemHeaderTexts = page.locator("h5>b");
  itemHeaderTexts.first().waitFor(); //instead of network idle use this

  await page.locator(".card-body").filter({ hasText: "ADIDAS ORIGINAL" }).getByRole("button", { name: "Add To Cart" }).click();

  await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

  await page.locator("text=ADIDAS ORIGINAL").isVisible();
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button", { name: "India" }).nth(1).click();
  await page.getByText("Place Order").click();

  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

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
