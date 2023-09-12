import { BrowserContext, Page, test, TestInfo } from '@playwright/test'
import { Workbook } from 'exceljs'
import { log } from 'handlebars/runtime'
import { runSheet, getTestCases } from '../src/actions'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT, BASEURL, USERID, PASSWORD, TESTCASEGENERATEDFILE
} from '../src/consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER, syncReadFile, syncWriteFile } from '../src/lib'

//global page and context
let page: Page;
let ctx: BrowserContext;
const wb = new Workbook()
const vars = {};

test.describe('iBot Tests', () => {

  test.beforeAll(async ({ browser }) => {
    logAll('Before tests start...')
    TOTAL_TIMER.start()
    logAll('NOW:', humanNowDateTime())

    logAll()
    logAll('FILE:', FILE)
    logAll('SHEET:', SHEET)
    logAll('BASEURL:', BASEURL)
    logAll('USERID:', USERID)
    logAll('PASSWORD:', PASSWORD)
    logAll()

    logAll('LOCATOR:', LOCATOR)
    logAll('ACTION:', ACTION)
    logAll('DATA:', DATA)
    logAll('ACTION_FORMAT:', ACTION_FORMAT)
    logAll('PRINT_FORMAT:', PRINT_FORMAT)
    logAll('COMMENT_FORMAT:', COMMENT_FORMAT)

    logAll('TRACE_FORMAT:', TRACE_FORMAT)


    await wb.xlsx.readFile(FILE!)
    logAll('sheets: ', wb.worksheets.length)
    //if (TRACE) logAll(wb.worksheets.map(w => w.name))
    //Worksheet name and index
    wb.eachSheet((worksheet, sheetId) => {
      logAll(sheetId, worksheet.name);
    })
   
    ctx ??= await browser.newContext();
    page ??= await ctx.newPage();
  });

  test.afterAll(async () => {
    logAll('After Tests')
    logAll('----')
    logAll('TOTAL TIME:', TOTAL_TIMER.end())
    logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
    logAll('---------- xxxx ----------')
    logAll()
  })

  test('generate code', async () => {
    let codeSheet = ''
    try {
      wb.eachSheet((worksheet, sheetId) => {
        let codeTestCase = ''
        const sheets = parseInts(SHEET, wb)
        if (sheets.includes(sheetId)) {
          logAll('Generating Test Cases for Sheet: ', sheetId)
          const testCaseRows = getTestCases(worksheet, page, ctx)
          if (testCaseRows.size == 0) logAll("ERROR: NO TEST CASE FOUND!");
          for (let i = 0; i < testCaseRows.size; i++) {
            const index = Array.from(testCaseRows.keys())[i];
            const nextIndex = i == (testCaseRows.size - 1) ? index : Array.from(testCaseRows.keys())[i + 1] - 1;
            const value = testCaseRows.get(index);
            codeTestCase += (
              `
                test('${worksheet.name}  -- ${String(index).padStart(3, '0')}-${value}', async({}, testInfo)=>{
                  await runSheetEachTest(wb.getWorksheet('${worksheet.name}'), pag, ctx, testInfo, ifmgr, ${index}, ${nextIndex}, vars)
                })
                            
                `)
          }

          codeSheet += (`test.describe('Run Sheet ${worksheet.name}',()=>{
                  logAll()
                  logAll('Running sheet: ${worksheet.name} - ${worksheet.rowCount} row(s)')
                  logAll('---- ---- ---- ----')
                  SHEET_TIMER.start()
                  ${codeTestCase}
                  logSheetClose()
                  logAll() 
                })
                \n`)
        }
      })
    } catch (error) {
      logAll(error)
    }

    const templatefile = syncReadFile('../tests/testcase.template.spec.ts')
    let generatedtestfile = templatefile.replace('/*{{code}}*/', codeSheet)
    const outfilename =`../tests-generatedfiles/${TESTCASEGENERATEDFILE}`
    syncWriteFile(outfilename, generatedtestfile)
    //await page.waitForTimeout(2 * 1000);
    logAll(`${outfilename} file generated`)
  })
})


