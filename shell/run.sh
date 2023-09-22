echo "Running run.sh..................................................."
echo "Running Test Parallely from ./testrun.csv..."
echo "Generating run-parallel-generated script..."
npx playwright test ./tests/testrun.spec.ts --reporter=null
echo "Running Generating Test Cases from file 'run-parallel-generated.sh'"
chmod +x ./shell/run-parallel-generated.sh
./shell/run-parallel-generated.sh