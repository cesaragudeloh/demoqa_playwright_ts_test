import { defineConfig, devices } from '@playwright/test';
import { env } from './src/core/env';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [
        ['dot'],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['html', { open: 'never' }],
      ]
    : [
        ['list'],
        ['html', { open: 'never' }],
      ],
  use: {
    baseURL: env.uiBaseUrl,
    headless: true,
    viewport: { width: 1366, height: 768 },
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    screenshot: isCI ? 'only-on-failure' : 'on',
    video: isCI ? 'retain-on-failure' : 'on',
    trace: isCI ? 'retain-on-failure' : 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'api',
      testMatch: [/tests\/api\/.*\.spec\.ts/, /tests\/graphql\/.*\.spec\.ts/],
      use: {
        baseURL: env.apiBaseUrl,
      },
    },
  ],
});

