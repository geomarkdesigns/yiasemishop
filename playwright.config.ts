import { defineConfig, devices } from "@playwright/test";
import fs from "node:fs";

const chromium = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
export const MOCK_LOG = "test-results/stripe-mock.log";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: "http://localhost:3100", launchOptions: chromium ? { executablePath: chromium } : {}, trace: "off" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], launchOptions: chromium ? { executablePath: chromium } : {} }, grepInvert: /@mobile/ },
    { name: "mobile", use: { ...devices["Pixel 7"], launchOptions: chromium ? { executablePath: chromium } : {} }, grep: /@mobile/ },
  ],
  webServer: [
    { command: `mkdir -p test-results && : > ${MOCK_LOG} && MOCK_LOG=${MOCK_LOG} node tests/e2e/stripe-mock.mjs`, port: 12111, reuseExistingServer: false },
    { command: "npx next start -p 3100", port: 3100, reuseExistingServer: false,
      env: { STRIPE_SECRET_KEY: "sk_test_mock", STRIPE_WEBHOOK_SECRET: "whsec_test_mock", STRIPE_API_BASE: "http://localhost:12111", NEXT_PUBLIC_SITE_URL: "http://localhost:3100" } },
  ],
});
