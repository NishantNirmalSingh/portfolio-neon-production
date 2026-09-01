const net = require('net');
const host = 'myprojectwebsite-myprojectwebsite.l.aivencloud.com';
const port = 14579;

console.log(`Attempting to connect to ${host}:${port}...`);
const socket = new net.Socket();
const timeout = 5000;

socket.setTimeout(timeout);

socket.on('connect', () => {
    console.log('Successfully connected to the database port!');
    socket.destroy();
});

socket.on('timeout', () => {
    console.log('Connection timed out after ' + timeout + 'ms');
    socket.destroy();
});

socket.on('error', (err) => {
    console.log('Connection error:', err.message);
});

socket.connect(port, host);
