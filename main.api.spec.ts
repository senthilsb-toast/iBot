import { test, expect} from '@playwright/test'
import { Workbook } from 'exceljs'
import { runSheet, getTestCases } from './actions'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from './consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER, syncReadFile,syncWriteFile } from './lib'

//global page and context
let page;
let ctx;
const wb = new Workbook()

test.describe('iBot Tests',()=>{
 
  test.beforeAll(async ({browser}) => {
    logAll('Before tests start...')
    TOTAL_TIMER.start()
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

    
    await wb.xlsx.readFile(FILE!)
    logAll('sheets: ', wb.worksheets.length)
    //if (TRACE) logAll(wb.worksheets.map(w => w.name))
    //Worksheet name and index
    wb.eachSheet((worksheet, sheetId) => {
      logAll(sheetId, worksheet.name);
    })
    ctx = await browser.newContext();
    page = await ctx.newPage();
  });

  test.afterAll(async ({ browser }) => {
    logAll('After Tests')
    logAll('----')
    logAll('TOTAL TIME:', TOTAL_TIMER.end())
    logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
    logAll('---------- xxxx ----------')
    logAll()
    browser.close;
  })

  
  let _number: number;
  let _sys_id: string;
  const short_description = "required ms office 365 for 2"
  // Create
  test("Create an Incident", async ({ request, baseURL }) => {
      //logAll(baseURL)
      const _response = await request.post(`${baseURL}`, {
          data: {
              "short_description": short_description,
              "category": "software"
          }, headers: {
              "Accept": "application/json"
          }
      });
      expect(_response.ok()).toBeTruthy();
      expect(_response.status()).toBe(201);
      const res = await _response.json();    
      //logAll(res);
      _number = res.result.task_effective_number;
      _sys_id = res.result.sys_id;
  
      // output as xml
      // logAll((await _response.body()).toString());
  })
  
  // Get
  test("Get an Incident", async ({ request, baseURL }) => {
      //logAll(baseURL)
      const _response = await request.get(`${baseURL}`, {
        params: {
            task_effective_number: _number,
            sysparm_fields: "short_description, category"
        }
      });
      expect(_response.ok()).toBeTruthy();
      expect(_response.status()).toBe(200);
      const res = await _response.json();    
      //logAll(res);
      expect(res).toMatchObject({
        result: [{ short_description: short_description, category: 'software' }]
  })

  })

  // Update
  test("Put(Modify) an Incident", async ({ request, baseURL }) => {
    const _response = await request.put(`${baseURL}/${_sys_id}`, {
      data: {
          "short_description": "iBot Test",
          "category": "Software"
      }
    });
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(200);
    const res = await _response.json();    
    //logAll(res);
  })

  // Delete
  test("Delete an Incident", async ({ request, baseURL }) => {
    const _response = await request.delete(`${baseURL}/${_sys_id}`);
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(204);
    // output as xml
    // logAll((await _response.body()).toString());
  })

})


