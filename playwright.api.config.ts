import { PlaywrightTestConfig } from '@playwright/test';

const defineConfig: PlaywrightTestConfig = {
  use: {
    // All requests we send go to this API endpoint.
    baseURL: "https://dev83618.service-now.com/api/now/table/incident",    
    extraHTTPHeaders: {
      // Assuming personal access token available in the environment.
      'Authorization': `${process.env.API_TOKEN}`,
    },
  }
}
export default defineConfig;