'use strict';

const Router = require('koa-router');

const useragent = require('useragent');

const router = module.exports = new Router();

router.get('/', (ctx) => {
  const addresses = ctx.get('x-forwarded-for').split(', ');
  const accepts = ctx.acceptsLanguages();
  const agent = useragent.parse(ctx.get('user-agent'));

  ctx.body = {
    ipaddress: addresses[0],
    language: accepts[0] || '',
    software: agent.os.toString()
  };
  ctx.type = 'application/json';
});
