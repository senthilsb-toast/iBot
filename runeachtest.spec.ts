import { BrowserContext, type Page, test, TestInfo } from '@playwright/test'
import { Workbook } from 'exceljs'
import { runSheet, runSheetEachTest } from './actions'
import { IFmgr } from "./ifmgr";
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from './consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER } from './lib'



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
  test.describe('Run Sheet basics',()=>{
                  logAll()
                  logAll('Running sheet: basics - 37 row(s)')
                  logAll('---- ---- ---- ----')
                  SHEET_TIMER.start()
                  
                test('basics  -- 003-url', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 3, 3, vars)
                })
                            
                
                test('basics  -- 004-title', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 4, 4, vars)
                })
                            
                
                test('basics  -- 005-title:exact', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 5, 5, vars)
                })
                            
                
                test('basics  -- 006-assert', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 6, 6, vars)
                })
                            
                
                test('basics  -- 007-assert:exact', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 7, 7, vars)
                })
                            
                
                test('basics  -- 008-assert', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 8, 8, vars)
                })
                            
                
                test('basics  -- 009-assert:exact', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 9, 9, vars)
                })
                            
                
                test('basics  -- 010-assert:exact', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 10, 10, vars)
                })
                            
                
                test('basics  -- 011-click', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 11, 11, vars)
                })
                            
                
                test('basics  -- 012-print', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 12, 13, vars)
                })
                            
                
                test('basics  -- 014-assert', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 14, 14, vars)
                })
                            
                
                test('basics  -- 015-assert', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 15, 15, vars)
                })
                            
                
                test('basics  -- 016-exists:not', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 16, 16, vars)
                })
                            
                
                test('basics  -- 017-click', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 17, 17, vars)
                })
                            
                
                test('basics  -- 018-assert', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 18, 18, vars)
                })
                            
                
                test('basics  -- 019-click', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 19, 19, vars)
                })
                            
                
                test('basics  -- 020-exists:not', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 20, 20, vars)
                })
                            
                
                test('basics  -- 021-print', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 21, 22, vars)
                })
                            
                
                test('basics  -- 023-url', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 23, 23, vars)
                })
                            
                
                test('basics  -- 024-screenshot', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 24, 24, vars)
                })
                            
                
                test('basics  -- 025-title', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 25, 25, vars)
                })
                            
                
                test('basics  -- 026-keys', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 26, 26, vars)
                })
                            
                
                test('basics  -- 027-keys', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 27, 27, vars)
                })
                            
                
                test('basics  -- 028-assert:value:exact', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 28, 28, vars)
                })
                            
                
                test('basics  -- 029-assert:value', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 29, 29, vars)
                })
                            
                
                test('basics  -- 030-sleep', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('basics'), pag, ctx, testInfo, ifmgr, 30, 30, vars)
                })
                            
                
                  logSheetClose()
                  logAll() 
                })
                

})
