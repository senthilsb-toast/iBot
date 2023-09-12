import { BrowserContext, type Page, test, TestInfo } from '@playwright/test'
import { Workbook } from 'exceljs'
import { runSheet, runSheetEachTest } from '../src/actions'
import { IFmgr } from "../src/ifmgr";
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT, BASEURL, USERID, PASSWORD
} from '../src/consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER } from '../src/lib'



let pag: Page;
let ctx: BrowserContext;

const wb = new Workbook();
const vars = {};
const ifmgr = new IFmgr();

test.describe.configure({ mode: 'serial' });

test.describe('iBot Tests', () => {

  test.beforeAll(async ({ browser }) => {
    // called when a new worker process begin
    if (pag) {
      // page already created, skip
      return;
    }

    logAll('Before iBot Tests...')
    logAll('NOW:', humanNowDateTime())
    logAll('FILE:', FILE)
    logAll('SHEET:', SHEET)
    logAll('BASEURL:', BASEURL)
    logAll('USERID:', USERID)
    logAll('PASSWORD:', PASSWORD)

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

    // on first call, create a new page
    pag = await browser.newPage();
    ctx = pag.context();
  });

  test.afterAll(async () => {
    logAll('After iBot Tests...')
    logAll('----')
    logAll('TOTAL TIME:', TOTAL_TIMER.end())
    logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
    logAll('---------- xxxx ----------')
    logAll()
    //pag = page;
  })
  //Placeholder for the generated code 
  test.describe('Run Sheet key',()=>{
                  logAll()
                  logAll('Running sheet: key - 11 row(s)')
                  logAll('---- ---- ---- ----')
                  SHEET_TIMER.start()
                  
                test('key  -- 003-url', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('key'), pag, ctx, testInfo, ifmgr, 3, 3, vars)
                })
                            
                
                test('key  -- 004-title', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('key'), pag, ctx, testInfo, ifmgr, 4, 4, vars)
                })
                            
                
                test('key  -- 005-click:text', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('key'), pag, ctx, testInfo, ifmgr, 5, 6, vars)
                })
                            
                
                test('key  -- 007-assert', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('key'), pag, ctx, testInfo, ifmgr, 7, 7, vars)
                })
                            
                
                test('key  -- 008-key', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('key'), pag, ctx, testInfo, ifmgr, 8, 8, vars)
                })
                            
                
                test('key  -- 009-assert', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('key'), pag, ctx, testInfo, ifmgr, 9, 9, vars)
                })
                            
                
                test('key  -- 010-key', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('key'), pag, ctx, testInfo, ifmgr, 10, 10, vars)
                })
                            
                
                test('key  -- 011-assert', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('key'), pag, ctx, testInfo, ifmgr, 11, 11, vars)
                })
                            
                
                  logSheetClose()
                  logAll() 
                })
                
test.describe('Run Sheet var_set',()=>{
                  logAll()
                  logAll('Running sheet: var_set - 14 row(s)')
                  logAll('---- ---- ---- ----')
                  SHEET_TIMER.start()
                  
                test('var_set  -- 004-url', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('var_set'), pag, ctx, testInfo, ifmgr, 4, 4, vars)
                })
                            
                
                test('var_set  -- 005-title', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('var_set'), pag, ctx, testInfo, ifmgr, 5, 5, vars)
                })
                            
                
                test('var_set  -- 006-var', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('var_set'), pag, ctx, testInfo, ifmgr, 6, 6, vars)
                })
                            
                
                test('var_set  -- 007-print', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('var_set'), pag, ctx, testInfo, ifmgr, 7, 7, vars)
                })
                            
                
                test('var_set  -- 008-print', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('var_set'), pag, ctx, testInfo, ifmgr, 8, 8, vars)
                })
                            
                
                test('var_set  -- 009-var:set', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('var_set'), pag, ctx, testInfo, ifmgr, 9, 9, vars)
                })
                            
                
                test('var_set  -- 010-print', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('var_set'), pag, ctx, testInfo, ifmgr, 10, 10, vars)
                })
                            
                
                test('var_set  -- 011-assert', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('var_set'), pag, ctx, testInfo, ifmgr, 11, 13, vars)
                })
                            
                
                test('var_set  -- 014-print', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('var_set'), pag, ctx, testInfo, ifmgr, 14, 14, vars)
                })
                            
                
                  logSheetClose()
                  logAll() 
                })
                

})
