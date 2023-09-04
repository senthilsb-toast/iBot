echo "Running Test Case Generation..."  
rm -rf allure-results
isodate=$(date '+%Y-%m-%d-%H-%M-%S')
npx playwright test ./tests/generate.tests.spec.ts
echo "Running Test Cases..."
npx playwright test runeachtest.spec.ts --reporter=line,allure-playwright 
echo "Generating Report..."
npx allure generate ./allure-results --clean -o ./allure-report--$isodate
echo "calling send email..."
sh ./command/email.sh allure-report--$isodate
#To clean all the allure-report folder 
#rm -Rf allure-report*
