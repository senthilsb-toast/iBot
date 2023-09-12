#Start-Process powershell.exe -WindowStyle Hidden -ArgumentList $args

$testargs = '-file .\shell\testrun.ps1 -testfile "./testcasefiles/sample-tests.xlsx" -sheet "15" -baseurl "https://letcode.in/windows" -userid "bbbb" -password "ccccs" -report "report" -email "email"'
Start-Process powershell.exe -ArgumentList $testargs
$testargs = '-file .\shell\testrun.ps1 -testfile "./testcasefiles/sample-tests.xlsx" -sheet "2" -baseurl "https://the-internet.herokuapp.com/" -userid "abc" -password "abcd" -report "" -email ""'
Start-Process powershell.exe -ArgumentList $testargs