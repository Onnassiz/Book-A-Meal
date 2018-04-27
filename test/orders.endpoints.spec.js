/* eslint object-curly-newline: ["off"] */

const request = require('request');
const { expect } = require('chai');
const { describe, it } = require('mocha');


const baseUrl = 'http://localhost:3002/api/v1';

describe('Orders Controller', () => {
  describe('Test get /orders', () => {
    it('It should return status(200)', (done) => {
      request.get({ url: `${baseUrl}/orders` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return an array', (done) => {
      request.get({ url: `${baseUrl}/orders` }, (error, response, body) => {
        expect(Array.isArray(JSON.parse(body))).to.equal(true);
        done();
      });
    });
  });

  describe('Test get /orders/:id', () => {
    it('It should return status(200)', (done) => {
      request.get({ url: `${baseUrl}/orders/1` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404) if wrong index is used', (done) => {
      request.get({ url: `${baseUrl}/orders/13` }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('It should return an object', (done) => {
      request.get({ url: `${baseUrl}/orders/1` }, (error, response, body) => {
        expect(typeof JSON.parse(body)).to.equal('object');
        done();
      });
    });
  });

  describe('Test get /orders/user/:userId', () => {
    it('It should return status(200)', (done) => {
      request.get({ url: `${baseUrl}/orders/user/1` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return an array of size 2 for user 1', (done) => {
      request.get({ url: `${baseUrl}/orders/user/1` }, (error, response, body) => {
        expect(JSON.parse(body).length).to.equal(2);
        done();
      });
    });
  });

  describe('Test post /orders', () => {
    it('It should return status(200)', (done) => {
      const order = {
        id: 6,
        dateTime: '2018-04-29 : 16:23',
        meals: [
          {
            id: 1,
            name: 'Chicken Pa-Naeng - Beef',
            description: 'Red Curry with Peanut Sauce, Bamboo Shoot, Ginger, Bell Pepper, Green Bean, Galanga and Lemon Leaves. Choice of Chicken, Beef, Pork, Tofu or Shrimp.',
            price: 2300,
            category: 'Hot Meal',
            image: '1.jpg',
          },
        ],
        amount: 5800,
        user: {
          id: 2,
          username: 'ifyben4me@gmail.com',
          password: 'password',
          name: 'Onah Ifeanyi',
          role: 'caterer',
          active: true,
        },
      };

      request.post({ url: `${baseUrl}/orders`, form: order }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(400) if order is not supplied', (done) => {
      const order = {};

      request.post({ url: `${baseUrl}/orders`, form: order }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('Test put /orders', () => {
    it('It should return status(200)', (done) => {
      const order = {
        id: 9,
        dateTime: '2018-04-29 : 16:23',
        meals: [
          {
            id: 1,
            name: 'Chicken Pa-Naeng - Beef',
            description: 'Red Curry with Peanut Sauce, Bamboo Shoot, Ginger, Bell Pepper, Green Bean, Galanga and Lemon Leaves. Choice of Chicken, Beef, Pork, Tofu or Shrimp.',
            price: 2300,
            category: 'Hot Meal',
            image: '1.jpg',
          },
        ],
        amount: 5800,
        user: {
          id: 2,
          username: 'ifyben4me@gmail.com',
          password: 'password',
          name: 'Onah Ifeanyi',
          role: 'caterer',
          active: true,
        },
      };
      request.put({ url: `${baseUrl}/orders/3`, form: order }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(400) if order is not found', (done) => {
      request.put({ url: `${baseUrl}/orders/19`, form: {} }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('It should return status(400) if order is empty', (done) => {
      request.put({ url: `${baseUrl}/orders/2`, form: {} }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });
});
