'use strict';

const test = require('tape');
const request = require('supertest');
const app = require('../../app.js');

const server = app.listen();

test('server', t => {
  t.plan(1);

  request(server)
    .get('/')
    .set({
      'Accept-Language': 'en-US,en;q=0.5',
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0',
      'X-Forwarded-For': '159.20.14.100'
    })
    .expect('content-type', /json/)
    .expect(200, {
      ipaddress: '159.20.14.100',
      language: 'en-US,en;q=0.5',
      software: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0'
    })
    .end(err => t.error(err, '200 GET /', err));
});

test.onFinish(() => server.close());
