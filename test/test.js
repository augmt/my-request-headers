'use strict';

import test from 'tape';
import { expect } from 'chai';
import request from 'supertest';
import app from './../src/app.js';

const server = app.listen();

test(app.name, (t) => {
  const tests = [
    (t) => {
      request(server)
        .get('/')
        .expect('Content-Type', /json/)
        .end((err) => t.ifError(err, 'content-type should be json'));
    },
    (t, headers) => {
      const get = request(server).get('/');

      for (let header in headers) {
        if (headers[header] === null) {
          get.unset(header);
        } else {
          get.set(header, headers[header]);
        }
      }

      get
        .expect((res) => expect(res.body).to.have.all.keys([
          'ipaddress',
          'language',
          'software'
        ]))
        .end((err) => t.ifError(err, 'response properties should consist of all and only the specified properties'));
    }
  ];
  const testCases = [
    {
      headers: {'User-Agent': null},
      message: 'when headers are not set',
      tests
    },
    {
      headers: {
        'Accept-Language': '',
        'User-Agent': '',
        'X-Forwarded-For': ''
      },
      message: 'when headers are empty',
      tests
    },
    {
      headers: {
        'Accept-Language': 'en,en-us;q=0.7,nl;q=0.3',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0',
        'X-Forwarded-For': '141.81.129.241, 140.16.171.217, 71.145.61.198'
      },
      message: 'when headers are set',
      tests: tests.concat([
        (t, headers) => {
          request(server)
            .get('/')
            .set(headers)
            .expect((res) => expect(res.body).to.deep.equal({
              ipaddress: '141.81.129.241',
              language: 'en',
              software: 'Windows 10'
            }))
            .end((err) => t.ifError(err, 'response values should be a parsing of the header\'s specified properties'));
        }
      ])
    }
  ];

  testCases.forEach((testCase) => {
    t.test(testCase.message, (t) => {
      t.plan(testCase.tests.length);

      testCase.tests.forEach((test) => test(t, testCase.headers));
    });
  });
});

test.onFinish(() => server.close());
