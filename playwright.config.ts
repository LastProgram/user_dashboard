import { defineConfig, devices } from '@playwright/test'

const baseUrl = 'http://127.0.0.1:3000'

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/smoke/**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    baseURL: baseUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: baseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
