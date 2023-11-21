import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';

import Koa from 'koa';
import send from 'koa-send';
import serve from 'koa-static';

const app = new Koa();

const options = {
  key: fs.readFileSync('../ssl/server.pem'),
  cert: fs.readFileSync('../ssl/server.crt'),
};

app.use(serve(path.join(path.resolve(), 'public')));

app.use(async (context) => {
  await send(context, 'index.html', {
    root: path.join(path.resolve(), 'public'),
  });
});

https.createServer(options, app.callback()).listen(443, () => {
  console.log('Serving :443');
});
