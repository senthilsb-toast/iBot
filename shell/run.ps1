Write-Host "Running Test Parallely from ./testrun.csv.......";
Write-Host "Generating Test Cases.......";
npx playwright test ./tests/testrun.spec.ts --reporter='null';
Write-Host "Running Generating Test Cases from file 'run-parallel-generated.ps1'";
./shell/run-parallel-generated.ps1;