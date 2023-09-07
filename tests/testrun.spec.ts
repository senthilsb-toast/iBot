import { test, TestInfo } from '@playwright/test'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from '../src/consts'
import { logAll, syncReadFile, syncWriteFile, TOTAL_TIMER, template } from '../src/lib'
import Path from 'path'

test('Generate Run Tests Script File', async () => {
  TOTAL_TIMER.start()
  logAll('NOW:', humanNowDateTime())

  const lines: string[] = syncReadFile('../testrunshell/testrun.csv').toString().split("\n");
  let shellString = ''
  for (var line in lines) {
    logAll('File Line :', lines[line])
    logAll()
    const rawLine: string[] = lines[line].split('|')
    const fileName = rawLine[0].split('=')[1]
    const sheetNumber = rawLine[1].split('=')[1]
    const baseURL = rawLine[2].split('=')[1]
    const userName = rawLine[3].split('=')[1]
    const pass = rawLine[4].split('=')[1]
    const cmdGenerateTestCases = `FILE=${fileName} SHEET=${sheetNumber} BASEURL=${baseURL} USERID=${userName} PASSWORD=${pass} TESTCASEGENERATEDFILE=../testcasegeneratedfile/${Path.parse(`${fileName}`).name}-${sheetNumber}-${baseURL.split('.').join('')}-${userName}.spec.ts npx playwright test ./tests/generate.tests.spec.ts`
    const cmdRunTestCases = `USER=${userName} PASS=${pass} SHEET=${sheetNumber} FILE=${fileName} npx playwright test ../testcasegeneratedfile/${Path.parse(`${fileName}`).name}-${sheetNumber}-${baseURL.split('.').join('')}-${userName}.spec.ts`
    const macShellScript = `osascript -e 'tell app "Terminal" do script "${cmdGenerateTestCases}" && "${cmdRunTestCases}" end tell'`
    shellString += macShellScript + '\n'
    //logAll('Cmd Generate Test Cases :', cmdGenerateTestCases)
    //logAll();
    //logAll('Cmd Run Test Cases :', cmdRunTestCases)
  }

  const shellfile = '../testrunshell/testrun.sh'
  logAll('writing to file...', shellfile)
  syncWriteFile(shellfile, shellString)
  logAll('file created...', shellfile)

  logAll()
  logAll('----')
  logAll('TOTAL TIME:', TOTAL_TIMER.end())
  logAll('---------- xxxx ----------')
  logAll()

})

