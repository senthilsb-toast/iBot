echo "combining allure report...."
allure-combine ./$1/ --dest ./allure-combine/ --auto-create-folders
echo "sending email..."
npx playwright test main.spec.mail.ts 