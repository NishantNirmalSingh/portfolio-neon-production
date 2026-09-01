const { spawn } = require('child_process');
const fs = require('fs');
const out = fs.openSync('./next_dev.log', 'w');
const p = spawn(process.execPath, ['./node_modules/next/dist/bin/next', 'dev'], {
  stdio: ['ignore', out, out],
  detached: true
});
p.unref();
