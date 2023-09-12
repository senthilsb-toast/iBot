#Start-Process powershell.exe -WindowStyle Hidden -ArgumentList $args
$args = '-file .\shell\testrun.ps1 -testfile "../testcasefiles/sample-tests.xlsx" -sheet "2,15" -baseurl "https://demoqa.com/text-box" -userid "abcc" -password "abcdd"'
Start-Process powershell.exe -ArgumentList $args
$args = '-file .\shell\testrun.ps1 -testfile "../testcasefiles/sample-tests.xlsx" -sheet "2" -baseurl "https://demoqa.com/text-box" -userid "abcc" -password "abcdd"'
Start-Process powershell.exe -ArgumentList $args