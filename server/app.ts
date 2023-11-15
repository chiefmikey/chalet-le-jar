import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.post('/rewind', async (context) => {
  const { data } = context.request.body;
  // Process the data here
  context.body = { status: 'success' };
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
