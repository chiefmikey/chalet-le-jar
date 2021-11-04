import Koa from 'koa';
// import bodyParser from 'koa-bodyparser';
// import cors from '@koa/cors';
import serve from 'koa-static';
import path from 'path';

const port = 3000;

const app = new Koa();

app
  // .use(
  //   cors({
  //     origin: '*',
  //     methods: 'GET, POST',
  //     allowedHeaders: '*',
  //     exposedHeaders: '*',
  //   }),
  // )
  // .use(bodyParser())
  .use(serve(path.resolve()));

app.listen(port, () => console.log('Koa is listening on port', port));

export default app;
