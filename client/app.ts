import path from 'node:path';

import Koa from 'koa';
import serve from 'koa-static';

const app = new Koa();

app.use(serve(path.join(path.resolve(), 'public')));

app.listen(8080, () => {
  console.log('Server is running on port :8080');
});
