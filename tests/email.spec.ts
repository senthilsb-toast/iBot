import { test, TestInfo } from '@playwright/test'
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT, SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_SENDER, SMTP_TO, TESTCASEGENERATEDFILE
} from '../src/consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER } from '../src/lib'

test.describe('iBot Tests Send Email', () => {

  test.beforeAll(async ({ browser }) => {
    logAll('Before iBot iBot Tests Send Email...')
    TOTAL_TIMER.start()

  });

  test.afterAll(async ({ browser }) => {
    logAll('After iBot iBot Tests Send Email...')
    logAll('----')
    logAll('TOTAL TIME:', TOTAL_TIMER.end())
    logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
    logAll('---------- xxxx ----------')
    logAll()
  })
  test('send email', async () => {

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
      logger: true
    })

    await transporter.verify()

    await transporter.sendMail({
      from: SMTP_SENDER,
      to: SMTP_TO,
      subject: 'Test Results',
      html: "<b>Test Case Result Report!</b>",
      attachments: [
        {

          filename: 'index.html',
          path: `./reports/${TESTCASEGENERATEDFILE}/index.html`
        },
      ]
    }).then(info => {
      logAll(info);
    }).catch(console.error);
  })
})
