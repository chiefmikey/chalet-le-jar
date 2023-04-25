const { timingSafeEqual } = require('node:crypto');
const { readFileSync } = require('node:fs');
const { inspect } = require('node:util');

const {
  utils: { parseKey },
  Server,
} = require('ssh2');

const allowedUser = Buffer.from('foo');
const allowedPassword = Buffer.from('bar');
const allowedPubKey = parseKey(readFileSync('foo.pub'));

function checkValue(input, allowed) {
  const autoReject = input.length !== allowed.length;
  if (autoReject) {
    // Prevent leaking length information by always making a comparison with the
    // same input when lengths don't match what we expect ...
    allowed = input;
  }
  const isMatch = timingSafeEqual(input, allowed);
  return !autoReject && isMatch;
}

new Server(
  {
    hostKeys: [readFileSync('host.key')],
  },
  (client) => {
    console.log('Client connected!');

    client
      .on('authentication', (context) => {
        let allowed = true;
        if (!checkValue(Buffer.from(context.username), allowedUser))
          allowed = false;

        switch (context.method) {
          case 'password': {
            if (!checkValue(Buffer.from(context.password), allowedPassword))
              return context.reject();
            break;
          }
          case 'publickey': {
            if (
              context.key.algo !== allowedPubKey.type ||
              !checkValue(context.key.data, allowedPubKey.getPublicSSH()) ||
              (context.signature &&
                allowedPubKey.verify(context.blob, context.signature) !== true)
            ) {
              return context.reject();
            }
            break;
          }
          default: {
            return context.reject();
          }
        }

        if (allowed) context.accept();
        else context.reject();
      })
      .on('ready', () => {
        console.log('Client authenticated!');

        client.on('session', (accept, reject) => {
          const session = accept();
          session.once('exec', (accept, reject, info) => {
            console.log(`Client wants to execute: ${inspect(info.command)}`);
            const stream = accept();
            stream.stderr.write('Oh no, the dreaded errors!\n');
            stream.write('Just kidding about the errors!\n');
            stream.exit(0);
            stream.end();
          });
        });
      })
      .on('close', () => {
        console.log('Client disconnected');
      });
  },
).listen(0, '127.0.0.1', function () {
  console.log(`Listening on port ${this.address().port}`);
});
