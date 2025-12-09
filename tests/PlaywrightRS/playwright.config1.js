// @ts-check
import { defineConfig } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  retries: 1,
  timeout: 10 * 1000,
  expect: {
    timeout: 20 * 1000,
  },
  reporter: "html",

  projects: [
    // Firefox Project
    {
      name: "firefox-execution",
      use: {
        browserName: "firefox",
        headless: false,
        viewport: null,
        screenshot: "off",
        trace: "retain-on-failure",
        video: "off",
      },
    },

    // Chromium Project
    {
      name: "chromium-execution",
      use: {
        browserName: "chromium",
        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
        headless: false,
        viewport: { width: 720, height: 720 },
        launchOptions: {
          args: ["--start-maximized"], // Works only for Chromium
        },
        screenshot: "off",
        trace: "retain-on-failure",
        video: "off",
      },
    },
  ],
});
