#Start-Process powershell.exe -WindowStyle Hidden -ArgumentList $args
echo "run-parallel-generated.sh....................................."
./shell/testrun.sh "./testcasefiles/sample-tests.xlsx" "15" "https://letcode.in/windows/" "bbbb" "ccccs" "report" ""report""
./shell/testrun.sh "./testcasefiles/sample-tests.xlsx" "2" "https://the-internet.herokuapp.com/" "abc" "abcd" "report" 