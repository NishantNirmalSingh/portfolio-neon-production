const { spawn } = require('child_process');
const fs = require('fs');

const child = spawn(/^win/.test(process.platform) ? 'npx.cmd' : 'npx', ['next', 'build'], {
  cwd: __dirname,
  env: process.env,
});

let out = '';
child.stdout.on('data', d => out += d.toString());
child.stderr.on('data', d => out += d.toString());

child.on('close', () => {
  fs.writeFileSync('build_log.txt', out);
  console.log('Build finished. See build_log.txt');
});
