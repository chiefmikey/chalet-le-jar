import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import {
  messageHelper,
  rewindHelper,
  saveHelper,
  sfxHelper,
  teleportHelper,
} from './helpers';

const app = new Koa();
const router = new Router();

router.post('/rewind', (context) => {
  const { data } = context.request.body as { data: string };
  rewindHelper(data);
  context.body = { status: 'success' };
  return context;
});

router.post('/save', (context) => {
  saveHelper();
  context.body = { status: 'success' };
  return context;
});

router.post('/sfx', (context) => {
  const { data } = context.request.body as { data: string };
  sfxHelper(data);
  context.body = { status: 'success' };
  return context;
});

router.post('/message', (context) => {
  const { data } = context.request.body as { data: string };
  messageHelper(data);
  context.body = { status: 'success' };
  return context;
});

router.post('/teleport', (context) => {
  const { data } = context.request.body as {
    data: { username: string; coordinates: string };
  };
  const { username, coordinates } = data;
  teleportHelper(username, coordinates);
  context.body = { status: 'success' };
  return context;
});

app.use(
  cors({
    origin: (context) => {
      const requestOrigin = context.request.header.origin;
      if (requestOrigin === 'https://chaletlejar.com') {
        return requestOrigin;
      }
      return '';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['POST'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }),
);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3004, () => {
  console.log('Server is running at http://localhost:3004');
});
