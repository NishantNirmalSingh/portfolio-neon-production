const { execSync } = require('child_process');
try {
  console.log(execSync('npx tsc --noEmit', { encoding: 'utf-8', cwd: __dirname }));
} catch (e) {
  console.log(e.stdout);
}
