
const request = require('request');
const { expect } = require('chai');
const { describe, it } = require('mocha');


const baseUrl = 'http://localhost:3001/api/v1';

require('../server.js');


describe('Index Route', () => {
  it('it should return Ok(200) and data', (done) => {
    request.get({ url: baseUrl }, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to Book-A-Meal');
      done();
    });
  });
});

