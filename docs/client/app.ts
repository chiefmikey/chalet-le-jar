import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'node:path';

const port = 3000;

const app = new Koa();

app
  .use(
    cors({
      origin: 'https://chaletlejar.com',
      allowMethods: ['GET'],
    }),
  )
  .use(bodyParser({}))
  .use(serve(path.join(path.resolve(), 'docs')))
  .listen(port, () =>
    console.log(`Koa is listening at http://localhost:${port}`),
  );

export default app;
