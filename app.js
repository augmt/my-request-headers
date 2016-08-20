'use strict';

const Koa = require('koa');

const cors = require('kcors');
const json = require('koa-json');
const router = require('./routes.js');

const app = module.exports = new Koa();

app.use(cors());
app.use(json());
app.use(router.routes());
