import { defineConfig, devices } from '@playwright/test';
import type { TestOptions} from './test-options';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
 
  /* Retry on CI only */
  retries: 1,

  reporter: 'html',
  use: {
    baseURL: process.env.DEV === '1' ? 'http://localhost: 4201/'
    : process.env.STAGING == '1' ? 'http://localhost:4202/'
    : 'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size: {width: 1920, height:1080}
    }
  },
 
  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/'
       },
    },

    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox'
      }
    },
    {
      name: 'pageObectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: { 
        viewport: {width: 1920, height:1080}
      }
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
              ... devices ['iPhone 13 Pro']
          }

        }
 
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    timeout: 300000,
    reuseExistingServer: !process.env.CI
  },
});
