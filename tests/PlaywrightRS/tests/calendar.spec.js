const { test, expect } = require("@playwright/test");

test("Calendar tests", async ({ browser, page }) => {
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  console.log(await page.title());
  const monthNumber = "6";
  const date = "16";
  const year = "2027";

  const calendarIcon = page.locator("svg.react-date-picker__calendar-button__icon");
  await calendarIcon.click();
  const topNavigationbar = page.locator("button.react-calendar__navigation__label");
  await topNavigationbar.click();
  await topNavigationbar.click();

  await page.getByText(year).click();

  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(monthNumber) - 1)
    .click();

  await page.locator("//abbr[text()='" + date + "']").click();
});
