/* eslint object-curly-newline: ["off"] */

const request = require('request');
const { expect } = require('chai');
const { describe, it } = require('mocha');


const baseUrl = 'http://localhost:3001/api/v1';


describe('UserController', () => {
  describe('Test get /users', () => {
    it('It should return status(200)', (done) => {
      request.get({ url: `${baseUrl}/users` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return an array', (done) => {
      request.get({ url: `${baseUrl}/users` }, (error, response, body) => {
        expect(Array.isArray(JSON.parse(body))).to.equal(true);
        done();
      });
    });
  });

  describe('Test get /users/:id', () => {
    it('It should return status(200)', (done) => {
      request.get({ url: `${baseUrl}/users/1` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404)', (done) => {
      request.get({ url: `${baseUrl}/users/10` }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('It should return an object', (done) => {
      request.get({ url: `${baseUrl}/users/1` }, (error, response, body) => {
        expect(typeof JSON.parse(body)).to.equal('object');
        done();
      });
    });
  });

  describe('Test post /users', () => {
    it('It should return status(200)', (done) => {
      request.post({ url: `${baseUrl}/users`, form: { id: 4, username: 'ben@gmail.com', password: 'password', name: 'Ben Onah' } }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('Test put /users', () => {
    it('It should return status(200)', (done) => {
      request.put({ url: `${baseUrl}/users/2`, form: { id: 4, username: 'ben@gmail.com', password: 'password', name: 'Ben Onah' } }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404)', (done) => {
      request.put({ url: `${baseUrl}/users/10`, form: { id: 4, username: 'ben@gmail.com', password: 'password', name: 'Ben Onah' } }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('Test change role /users/role/:id', () => {
    it('It should return status(200)', (done) => {
      request.put({ url: `${baseUrl}/users/role/2`, form: { role: 'tester' } }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404)', (done) => {
      request.put({ url: `${baseUrl}/users/role/12`, form: { role: 'tester' } }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('Test block user /users/block/:id', () => {
    it('It should return status(200)', (done) => {
      request.put({ url: `${baseUrl}/users/block/2` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404)', (done) => {
      request.put({ url: `${baseUrl}/users/block/12` }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('Test delete user /users/:id', () => {
    it('It should return status(200)', (done) => {
      request.delete({ url: `${baseUrl}/users/3` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404)', (done) => {
      request.delete({ url: `${baseUrl}/users/12` }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});

