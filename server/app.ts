import fs from 'node:fs';
import https from 'node:https';

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
  addTickingHelper,
  clearTickingHelper,
  resetTickingHelper,
  resetServerHelper,
  upgradeServerHelper,
  playerStatusHelper,
} from './helpers';

const app = new Koa();
const router = new Router();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/ip.chaletlejar.com/privkey.pem'),
  cert: fs.readFileSync(
    '/etc/letsencrypt/live/ip.chaletlejar.com/fullchain.pem',
  ),
};

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
    data: { username: string; coordinate: string };
  };
  const { username, coordinate } = data;
  teleportHelper(username, coordinate);
  context.body = { status: 'success' };
  return context;
});

router.post('/addticking', (context) => {
  const { data } = context.request.body as {
    data: { coordinate: string; radius: string; username: string };
  };
  const { coordinate, radius, username } = data;
  addTickingHelper(coordinate, radius, username);
  context.body = { status: 'success' };
  return context;
});

router.post('/removeticking', (context) => {
  const { data } = context.request.body as {
    data: { coordinate: string; radius: string; username: string };
  };
  const { coordinate, radius, username } = data;
  addTickingHelper(coordinate, radius, username);
  context.body = { status: 'success' };
  return context;
});

router.post('/clearticking', (context) => {
  clearTickingHelper();
  context.body = { status: 'success' };
  return context;
});

router.post('/resetticking', (context) => {
  resetTickingHelper();
  context.body = { status: 'success' };
  return context;
});

router.post('/resetserver', (context) => {
  resetServerHelper();
  context.body = { status: 'success' };
  return context;
});

router.post('/upgradeserver', (context) => {
  upgradeServerHelper();
  context.body = { status: 'success' };
  return context;
});

router.get('/playerstatus', (context) => {
  context.body = { users: playerStatusHelper() };
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

https.createServer(options, app.callback()).listen(3004, () => {
  console.log('Serving :3004');
});
