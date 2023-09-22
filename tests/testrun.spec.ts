import { test, TestInfo } from '@playwright/test'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from '../src/consts'
import { logAll, syncReadFile, syncWriteFile, TOTAL_TIMER } from '../src/lib'
const isWin = process.platform === "win32";

const psTemplate: string = `Write-Host "Setting environment variables...";
Write-Host "Excel FILE: $testfile";
$env:FILE=$testfile;
Write-Host "Excel SHEET: $sheet";
$env:SHEET=$sheet;
Write-Host "BASEURL: $baseurl";
$env:BASEURL=$baseurl;
Write-Host "USERID: $userid";
$env:USERID=$userid;
Write-Host "PASSWORD: $password";
$env:PASSWORD=$password; 
$tmpfile = Split-Path -Path $testfile -Leaf
$tmpfile = $tmpfile.replace('.','-')+"-"+$sheet.replace(',','-')+"-"+$userid+".spec.ts";
$env:TESTCASEGENERATEDFILE=$tmpfile; 
Write-Host "TESTCASEGENERATEDFILE: $tmpfile";
npx playwright test ./tests/generate.tests.spec.ts --reporter='null';
npx playwright test ./tests-generatedfiles/$tmpfile; `

test('Generate Run Tests Script File', async () => {

  TOTAL_TIMER.start()
  logAll('NOW:', humanNowDateTime())

  const lines: string[] = syncReadFile('../shell/testrun.csv').toString().split("\n");
  lines.shift()//skip header
  const cmdGenerateTestCases: string[] = [];
  cmdGenerateTestCases.push('#Start-Process powershell.exe -WindowStyle Hidden -ArgumentList $args')
  cmdGenerateTestCases.push('echo "run-parallel-generated.sh....................................."')
  for (var line in lines) {
    if ((lines[line] !== "") && (lines[line][0] != '#')) {
      logAll('File Line :', lines[line])
      const rawLine: string[] = lines[line].split(';')
      const fileName = rawLine[0]
      const sheetNumber = rawLine[1]
      const baseURL = rawLine[2] ?? ''
      const userId = rawLine[3] ?? ''
      const password = rawLine[4] ?? ''
      let report = rawLine[5] ?? ''
      let email = rawLine[6] ?? ''
      if (report !== '') { report = `"${report}"` }
      if (email !== '') { email = `"${email}"` }
      if (isWin) {
        const shellString = `$testargs = '-file .\\shell\\testrun.ps1 -testfile ${fileName} -sheet ${sheetNumber} -baseurl ${baseURL} -userid ${userId} -password ${password} -report "${report}" -email "${email}"'`
        cmdGenerateTestCases.push(shellString)
        cmdGenerateTestCases.push('Start-Process powershell.exe -ArgumentList $testargs')
      } else {
        //const shellString = `osascript -e 'tell application "Terminal" to do script "npx playwright test ${__dirname}/shell/testrun.sh ${fileName} ${sheetNumber} ${baseURL} ${userId} ${password} "${report}" "${email}" " '`
        const shellString = `./shell/testrun.sh ${fileName} ${sheetNumber} ${baseURL} ${userId} ${password} ${report} ${email}`
        cmdGenerateTestCases.push(shellString)
      }
    } else {
      logAll(`Line Skipped:===> ${lines[line]}`)
      continue;
    }
  }

  const shellfile = isWin ? '../shell/run-parallel-generated.ps1' : '../shell/run-parallel-generated.sh'

  logAll('Writing to file...', shellfile)
  syncWriteFile(shellfile, cmdGenerateTestCases.join('\r\n'))
  logAll('file created...', shellfile)

  logAll()
  logAll('----')
  logAll('TOTAL TIME:', TOTAL_TIMER.end())
  logAll('---------- xxxx ----------')
  logAll()

})

