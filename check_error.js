const { exec } = require('child_process');
const fs = require('fs');
exec('npx next build', (error, stdout, stderr) => {
  fs.writeFileSync('N:/Mywebsite/error_log.txt', `ERROR: ${error}\nSTDOUT: ${stdout}\nSTDERR: ${stderr}`);
});
