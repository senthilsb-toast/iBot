param(
    [string]$testfile,
    [string]$sheet,
    [string]$baseurl,
    [string]$userid,
    [string]$password,
    [switch]$Verbose
)
Write-Host "Setting environment variables...";
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
$tmpfile = $testfile.replace('.','-')+"-"+$sheet.replace(',','-')+"-"+$userid+".spec.ts";
$env:TESTCASEGENERATEDFILE=$tmpfile; 
Write-Host "TESTCASEGENERATEDFILE: $tmpfile";
npx playwright test ./tests/generate.tests.spec.ts --reporter='null';
npx playwright test ./tests-generatedfiles/$tmpfile; 

#.\shell\testrun.ps1 "sample-tests.xlsx" "2,15" "https://demoqa.com/text-box" "abc" "abcd"