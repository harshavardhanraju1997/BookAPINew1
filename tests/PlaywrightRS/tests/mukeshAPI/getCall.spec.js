import { test, expect } from "@playwright/test";

test("Test Get API", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");
  console.log("=======================================================================================");
  console.log("Response headers----->" + JSON.stringify(await response.headers()));
  console.log("=======================================================================================");
  console.log("Response Body----->" + JSON.stringify(await response.body()));
  console.log("=======================================================================================");
  console.log("Response status----->" + JSON.stringify(await response.status()));
  console.log("=======================================================================================");
  console.log("Response Json----->" + JSON.stringify(await response.json()));
  console.log("=======================================================================================");
  const jsonRecieved = await response.json();
  expect(response.status()).toBe(200);
  expect(jsonRecieved).toHaveProperty("data.id", 2);
});
