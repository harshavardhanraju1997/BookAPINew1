// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 10 * 1000,
  expect: {
    timeout: 20 * 1000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    video: "off",
    // browserName: "webkit",
    //browserName: "firefox",
    headless: false,
    //headless:true
    viewport: null, // null makes it use full screen size

    launchOptions: {
      args: ["--start-maximized"], // For Chromium browsers
    },
    screenshot: "off",

    trace: "retain-on-failure",
  },
});
