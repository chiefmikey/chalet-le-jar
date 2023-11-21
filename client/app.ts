import path from 'node:path';

import Koa from 'koa';
import send from 'koa-send';
import serve from 'koa-static';

const app = new Koa();

app.use(serve(path.join(path.resolve(), 'public')));

app.use(async (context) => {
  await send(context, 'index.html', {
    root: path.join(path.resolve(), 'public'),
  });
});

app.listen(80, () => {
  console.log('Running on :80');
});
