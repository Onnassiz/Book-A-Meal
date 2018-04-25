

const request = require('request');
const { expect } = require('chai');
const { describe, it } = require('mocha');


const baseUrl = 'http://localhost:3002/api';

require('../api/index.js');


describe('Return: Ok(200) and data', () => {
  it('Returns: Ok(200) and data', (done) => {
    request.get({ url: baseUrl }, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to Book-A-Meal');
      done();
    });
  });
});

