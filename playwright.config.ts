import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 15_000,
    navigationTimeout: 20_000,
  },
  // Keep concurrency low
  workers: 1,
  retries: 1, // a little resilience
  webServer: {
    command: 'vite',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
