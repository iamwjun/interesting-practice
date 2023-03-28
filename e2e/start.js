// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cron = require('node-cron');

cron.schedule('*/30 * * * *', () => {
  // eslint-disable-next-line no-console
  console.log('start test');

  // in the function's body
  execSync('npx playwright test', {
    encoding: 'utf-8',
    stdio: 'inherit',
  });
});
