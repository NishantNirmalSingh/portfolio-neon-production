const { spawn } = require('child_process');
const fs = require('fs');
const out = fs.openSync('./next_out.log', 'w');
const p = spawn('npm.cmd', ['run', 'dev'], {
  stdio: ['ignore', out, out],
  detached: true
});
p.unref();
