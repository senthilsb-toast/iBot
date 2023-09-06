import { test, TestInfo } from '@playwright/test'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from '../src/consts'
import { logAll, syncReadFile, TOTAL_TIMER, template } from '../src/lib'
import Path from 'path'

test('Generate Run Tests Script File', async () => {
  TOTAL_TIMER.start()
  logAll('NOW:', humanNowDateTime())

  const lines:string[] = syncReadFile('../testrunshell/testrun.csv').toString().split("\n");
  for(var line in lines) {
    logAll('File Line',lines[line])
    const rawLine:string[] = lines[line].split('|')
    const fileName = rawLine[0].split('=')[1]
    const sheetNumber = rawLine[1].split('=')[1]
    const userName = rawLine[2].split('=')[1]
    const pass = rawLine[3].split('=')[1]
    const lineData = `USER=${userName} PASS=${pass} SHEET=${sheetNumber} FILE=${fileName} TESTCASEGENERATEDFILE=../testcasegeneratedfile/${Path.parse(`${fileName}`).name}-${userName}-${sheetNumber}.spec.ts npx playwright test ./tests/generate.tests.spec.ts`
    const testCommand = `USER=${userName} PASS=${pass} SHEET=${sheetNumber} FILE=${fileName} npx playwright test ../testcasegeneratedfile/${Path.parse(`${fileName}`).name}-${userName}-${sheetNumber}.spec.ts`
    logAll(lineData)
    logAll(testCommand)
  }

  logAll()
  logAll('----')
  logAll('TOTAL TIME:', TOTAL_TIMER.end())
  logAll('---------- xxxx ----------')
  logAll()

})

