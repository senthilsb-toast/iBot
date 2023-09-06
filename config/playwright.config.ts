import { PlaywrightTestConfig } from '@playwright/test';

import dotenv from "dotenv"

dotenv.config({
  path:`.env.${process.env.test_env}`,
  override: true
})

const config: PlaywrightTestConfig = {
  reportSlowTests: null,
  timeout: 1000 * 60 * 10, //10 minutes
   use: {
     //video: 'on',
     //screenshot: 'on',
     //trace: 'on',
   },
   reporter: [['html', { open: 'always' }]],
}
export default config;