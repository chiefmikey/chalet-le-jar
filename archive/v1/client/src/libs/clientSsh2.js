import readFileSync from 'node:fs';

import Client from 'ssh2';

const conn = new Client();
conn
  .on('ready', () => {
    console.log('Client :: ready');
    conn.exec('uptime', (error, stream) => {
      if (error) throw error;
      stream
        .on('close', (code, signal) => {
          console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
          conn.end();
        })
        .on('data', (data) => {
          console.log(`STDOUT: ${data}`);
        })
        .stderr.on('data', (data) => {
          console.log(`STDERR: ${data}`);
        });
    });
  })
  .connect({
    host: '192.168.100.100',
    port: 22,
    username: 'frylock',
    privateKey: readFileSync('/path/to/my/key'),
  });

// example output:
// Client :: ready
// STDOUT:  17:41:15 up 22 days, 18:09,  1 user,  load average: 0.00, 0.01, 0.05
//
// Stream :: exit :: code: 0, signal: undefined
// Stream :: close
