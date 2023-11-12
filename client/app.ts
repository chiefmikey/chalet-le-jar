import path from 'node:path';

import Koa from 'koa';
import serve from 'koa-static';

const app = new Koa();

app.use(serve(path.join(path.resolve(), 'public')));

app.listen(8080, () => {
  console.log('Running on :8080');
});
