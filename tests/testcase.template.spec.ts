import { BrowserContext, type Page, test, TestInfo } from '@playwright/test'
import { Workbook } from 'exceljs'
import { runSheet, runSheetEachTest } from '../src/actions'
import { IFmgr } from "../src/ifmgr";
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from '../src/consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER } from '../src/lib'



let pag: Page;
let ctx: BrowserContext;

const wb = new Workbook();
const vars = {};
const ifmgr = new IFmgr();
let onStart = true;

test.describe.configure({ mode: 'serial' });

test.describe('iBot Tests', () => {

  test.beforeAll(async ({browser}) => {
    if (onStart) {
      logAll('Before iBot Tests...')
      logAll('NOW:', humanNowDateTime())
      logAll('FILE:', FILE)
      logAll('SHEET:', SHEET)

      logAll('LOCATOR:', LOCATOR)
      logAll('ACTION:', ACTION)
      logAll('DATA:', DATA)
      logAll('ACTION_FORMAT:', ACTION_FORMAT)
      logAll('PRINT_FORMAT:', PRINT_FORMAT)
      logAll('COMMENT_FORMAT:', COMMENT_FORMAT)

      logAll('TRACE_FORMAT:', TRACE_FORMAT)
      logAll('DEBUG_TRACE:', TRACE)
      TOTAL_TIMER.start()
      await wb.xlsx.readFile(FILE!)
    }

    //Init the context and page for all the test cases
    // ctx ??= await browser.contexts[0];
    pag ??= await browser.newPage();
    ctx ??= pag.context();
    onStart = false;
  });

  test.afterAll(async ({browser, page}) => {
    logAll('After iBot Tests...')
    logAll('----')
    logAll('TOTAL TIME:', TOTAL_TIMER.end())
    logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
    logAll('---------- xxxx ----------')
    logAll()
    //pag = page;
  })
  //Placeholder for the generated code 
  /*{{code}}*/
})
