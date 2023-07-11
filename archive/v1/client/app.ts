import path from 'node:path';

import Koa from 'koa';
import serve from 'koa-static';

const port = 3000;

const app = new Koa();

app
  .use(serve(path.join(path.resolve(), 'docs')))
  .listen(port, () =>
    console.log(`Koa is listening at http://localhost:${port}`),
  );

export default app;
