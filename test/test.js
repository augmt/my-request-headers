'use strict';

const expect = require('chai').expect;
const request = require('supertest');

const server = require('./../app.js').listen();

describe('app', function () {
  it('should respond with json', function (done) {
    request(server)
      .get('/')
      .expect('Content-Type', 'application/json; charset=utf-8', done);
  });

  it('should respond with all and only the correct keys', function (done) {
    request(server)
      .get('/')
      .set({'accept-language': '', 'x-forwarded-for': ''})
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res.body).to.have.all.keys(['ipaddress', 'language', 'software']);
        done();
      });
  });

  it('should respond with the client\'s IP address');

  it('should respond with the client\'s preferred language');

  it('should respond with the client\'s operating system');
});
