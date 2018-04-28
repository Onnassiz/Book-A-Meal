/* eslint object-curly-newline: ["off"] */

const request = require('request');
const { expect } = require('chai');
const { describe, it } = require('mocha');


const baseUrl = 'http://localhost:3001/api/v1';

describe('Meals Controller', () => {
  describe('Test get /meals', () => {
    it('It should return status(200)', (done) => {
      request.get({ url: `${baseUrl}/meals` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return an array', (done) => {
      request.get({ url: `${baseUrl}/meals` }, (error, response, body) => {
        expect(Array.isArray(JSON.parse(body))).to.equal(true);
        done();
      });
    });
  });

  describe('Test get /meals/:id', () => {
    it('It should return status(200)', (done) => {
      request.get({ url: `${baseUrl}/meals/1` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404) if wrong index is used', (done) => {
      request.get({ url: `${baseUrl}/meals/13` }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('It should return an object', (done) => {
      request.get({ url: `${baseUrl}/meals/1` }, (error, response, body) => {
        expect(typeof JSON.parse(body)).to.equal('object');
        done();
      });
    });
  });

  describe('Test post /meals', () => {
    it('It should return status(200)', (done) => {
      const meal = {
        id: 8,
        name: 'Chicken Pa-Naeng',
        description: 'Red Curry with Peanut Sauce, Bamboo Shoot, Ginger, Bell Pepper, Green Bean, Galanga and Lemon Leaves. Choice of Chicken, Beef, Pork, Tofu or Shrimp.',
        price: 2300,
        category: 'Dinner',
        image: '41.jpg',
      };

      request.post({ url: `${baseUrl}/meals`, form: meal }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(400) if meal is not supplied', (done) => {
      const meal = {};

      request.post({ url: `${baseUrl}/meals`, form: meal }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('Test put /meals', () => {
    it('It should return status(200)', (done) => {
      const meal = {
        id: 8,
        name: 'Chicken Pa-Naeng',
        description: 'Red Curry with Peanut Sauce, Bamboo Shoot, Ginger, Bell Pepper, Green Bean, Galanga and Lemon Leaves. Choice of Chicken, Beef, Pork, Tofu or Shrimp.',
        price: 2300,
        category: 'Dinner',
        image: '41.jpg',
      };
      request.put({ url: `${baseUrl}/meals/2`, form: meal }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404) if meal is not found', (done) => {
      request.put({ url: `${baseUrl}/meals/19`, form: {} }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('Test delete meal /meals/:id', () => {
    it('It should return status(200)', (done) => {
      request.delete({ url: `${baseUrl}/meals/5` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404)', (done) => {
      request.delete({ url: `${baseUrl}/meals/12` }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
