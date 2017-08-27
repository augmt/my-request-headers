'use strict';

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = {
    ipaddress: ctx.get('x-forwarded-for'),
    language: ctx.get('accept-language'),
    software: ctx.get('user-agent')
  };
  ctx.type = 'json';
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
