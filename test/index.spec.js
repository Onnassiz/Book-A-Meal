
import request from 'request';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import '../server';

const baseUrl = 'http://localhost:3001/api/v1';

describe('Index Route', () => {
  it('it should return Ok(200) and data', (done) => {
    request.get({ url: baseUrl }, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to Book-A-Meal');
      done();
    });
  });
});

