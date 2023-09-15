#osascript -e 'tell app "Terminal" do script "FILE=./testcasefile/sample-tests.xlsx SHEET=2 BASEURL= USERID= PASSWORD= TESTCASEGENERATEDFILE=../testcasegeneratedfile/sample-tests-2--.spec.ts npx playwright test ./tests/generate.tests.spec.ts" && "USER= PASS= SHEET=2 FILE=./testcasefile/sample-tests.xlsx npx playwright test ../testcasegeneratedfile/sample-tests-2--.spec.ts" end tell'
#osascript -e 'tell app "Terminal" do script "FILE=./testcasefile/sample-tests.xlsx SHEET=15 BASEURL=www.google.com USERID=abc PASSWORD=abcd TESTCASEGENERATEDFILE=../testcasegeneratedfile/sample-tests-15-wwwgooglecom-abc.spec.ts npx playwright test ./tests/generate.tests.spec.ts" && "USER=abc PASS=abcd SHEET=15 FILE=./testcasefile/sample-tests.xlsx npx playwright test ../testcasegeneratedfile/sample-tests-15-wwwgooglecom-abc.spec.ts" end tell'
echo FILE: $1
echo SHEET: $2
echo BASEURL: $3
echo USERID: $4
echo PASSWORD: $5
echo REPORT: $6
echo EMAIL: $7
tmpfile="$1"
sheet="$2"
usrid="$4"
tmpfile="${tmpfile##*/}"
tmpfile="${tmpfile/./-}"-"${sheet//,/-}"-"$usrid".spec.ts
#"-"${$2//,/-}"-$4+".spec.ts"
echo $tmpfile
#a='I am a string'
#echo "${$1//./-}"
if [ "$6" == "report" ] && [ "$7" == "email" ];  
then
    echo report and email
    FILE=$1 SHEET=$2 BASEURL=$3 USERID=$4 PASSWORD=$5 TESTCASEGENERATEDFILE=$tmpfile npx playwright test ./tests-generatedfiles/$tmpfile && FILE=$1 SHEET=$2 BASEURL=$3 USERID=$4 PASSWORD=$5 TESTCASEGENERATEDFILE=$tmpfile npx playwright test ./tests/email.spec.ts --reporter=null
elif [ "$6" == "report" ];
then
    echo report
    FILE=$1 SHEET=$2 BASEURL=$3 USERID=$4 PASSWORD=$5 TESTCASEGENERATEDFILE=$tmpfile npx playwright test ./tests-generatedfiles/$tmpfile
else
    FILE=$1 SHEET=$2 BASEURL=$3 USERID=$4 PASSWORD=$5 TESTCASEGENERATEDFILE=$tmpfile npx playwright test ./tests-generatedfiles/$tmpfile --reporter=null
fi  
#FILE=$1 SHEET=$2 BASEURL=$3 USERID=$4 PASSWORD=$5 TESTCASEGENERATEDFILE=$tmpfile npx playwright test ./tests-generatedfiles/$tmpfile 