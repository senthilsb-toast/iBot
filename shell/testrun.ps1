param(
    [string]$testfile,
    [string]$sheet,
    [string]$baseurl,
    [string]$userid,
    [string]$password,
    [string]$report,
    [string]$email,
    [switch]$Verbose
)
Write-Host "Setting environment variables...";
Write-Host "Excel FILE: $testfile";
$env:FILE = $testfile;
Write-Host "Excel SHEET: $sheet";
$env:SHEET = $sheet;
Write-Host "BASEURL: $baseurl";
$env:BASEURL = $baseurl;
Write-Host "USERID: $userid";
$env:USERID = $userid;
Write-Host "PASSWORD: $password";
$env:PASSWORD = $password; 
$tmpfile = Split-Path -Path $testfile -Leaf
$tmpfile = $tmpfile.replace('.', '-') + "-" + $sheet.replace(',', '-') + "-" + $userid + ".spec.ts";
$env:TESTCASEGENERATEDFILE = $tmpfile; 
Write-Host "TESTCASEGENERATEDFILE: $tmpfile";
npx playwright test ./tests/generate.tests.spec.ts --reporter='null';
if ($report -eq 'report' ) {
    npx playwright test ./tests-generatedfiles/$tmpfile --reporter=html; 
}else {
    npx playwright test ./tests-generatedfiles/$tmpfile; 
}
if ($email -eq 'email' ) {
   Write-Host "emailing........................."
}

#.\shell\testrun.ps1 -testfile "./testcasefiles/sample-tests.xlsx" -sheet "2,15" -baseurl "https://demoqa.com/text-box" -userid "abcc" -password "abcdd"