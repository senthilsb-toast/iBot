@echo off
@RD /S /Q "./allure-results"
SET isodate=%date:~10,4%-%date:~7,2%-%date:~4,2%-%time:~0,2%-%time:~3,2%-%time:~6,2%
echo %isodate%
npx playwright test ./tests/generate.tests.spec.ts && npx playwright test runeachtest.spec.ts --reporter=line,allure-playwright && npx allure generate ./allure-results --clean -o ./allure-report--%isodate% && ./command/email.bat allure-report--%isodate%

