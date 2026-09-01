const { exec } = require('child_process');
const fs = require('fs');

exec('npx next build', (err, stdout, stderr) => {
    fs.writeFileSync('build_result.txt', 'STDOUT:\n' + stdout + '\n\nSTDERR:\n' + stderr + '\n\nERR:\n' + (err ? err.message : 'null'));
});
