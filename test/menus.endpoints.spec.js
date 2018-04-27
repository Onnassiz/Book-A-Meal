/* eslint object-curly-newline: ["off"] */

const request = require('request');
const { expect } = require('chai');
const { describe, it } = require('mocha');


const baseUrl = 'http://localhost:3002/api/v1';

describe('Menus Controller', () => {
  describe('Test get /menus', () => {
    it('It should return status(200)', (done) => {
      request.get({ url: `${baseUrl}/menus` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return an array', (done) => {
      request.get({ url: `${baseUrl}/menus` }, (error, response, body) => {
        expect(Array.isArray(JSON.parse(body))).to.equal(true);
        done();
      });
    });
  });

  describe('Test get /menus/:timestamp', () => {
    it('It should return status(200)', (done) => {
      request.get({ url: `${baseUrl}/menus/1524960000` }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(404) if wrong timestamp is used', (done) => {
      request.get({ url: `${baseUrl}/menus/13` }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('It should return an object', (done) => {
      request.get({ url: `${baseUrl}/menus/1524960000` }, (error, response, body) => {
        expect(typeof JSON.parse(body)).to.equal('object');
        done();
      });
    });
  });

  describe('Test post /menus', () => {
    it('It should return status(200)', (done) => {
      const menu = {
        name: 'Sunday\'s blast',
        timestamp: 1524962211,
        meals: [
          {
            id: 6,
            name: 'Yum - Pork',
            description: 'Slice Thin Beef Mixed With Lettuce, Thread Noodle, Lime, Onion, Carrot, Cilantro. Topped with Peanuts. Choice of Beef, Pork or Seafood.',
            price: 2100,
            category: 'Hot Meal',
            image: '6.jpg',
          },
          {
            id: 4,
            name: 'Shrimp Frid Rice',
            description: 'Stir Fried Rice with Shrimp, Egg, Peas, Corn, Bean, Carrots, Onion. Topped with Cucumber and Lime.',
            price: 2000,
            category: 'Snack',
            image: '4.jpg',
          },
        ],
      };

      request.post({ url: `${baseUrl}/menus`, form: menu }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('It should return status(400) if menu is not supplied', (done) => {
      const menu = {};

      request.post({ url: `${baseUrl}/menus`, form: menu }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('It should return status(400) if menu already exists', (done) => {
      const menu = {
        name: 'Sunday\'s blast',
        timestamp: 1524960000,
        meals: [
          {
            id: 6,
            name: 'Yum - Pork',
            description: 'Slice Thin Beef Mixed With Lettuce, Thread Noodle, Lime, Onion, Carrot, Cilantro. Topped with Peanuts. Choice of Beef, Pork or Seafood.',
            price: 2100,
            category: 'Hot Meal',
            image: '6.jpg',
          },
          {
            id: 4,
            name: 'Shrimp Frid Rice',
            description: 'Stir Fried Rice with Shrimp, Egg, Peas, Corn, Bean, Carrots, Onion. Topped with Cucumber and Lime.',
            price: 2000,
            category: 'Snack',
            image: '4.jpg',
          },
        ],
      };

      request.post({ url: `${baseUrl}/menus`, form: menu }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('Test put /menus', () => {
    it('It should return status(200)', (done) => {
      const menu = {
        name: 'Sunday bread',
        timestamp: 1524960000,
        meals: [
          {
            id: 6,
            name: 'Yum - Pork',
            description: 'Slice Thin Beef Mixed With Lettuce, Thread Noodle, Lime, Onion, Carrot, Cilantro. Topped with Peanuts. Choice of Beef, Pork or Seafood.',
            price: 2100,
            category: 'Hot Meal',
            image: '6.jpg',
          },
          {
            id: 4,
            name: 'Shrimp Frid Rice',
            description: 'Stir Fried Rice with Shrimp, Egg, Peas, Corn, Bean, Carrots, Onion. Topped with Cucumber and Lime.',
            price: 2000,
            category: 'Snack',
            image: '4.jpg',
          },
        ],
      };

      request.put({ url: `${baseUrl}/menus/1524960000`, form: menu }, (error, response) => {
        expect(response.statusCode).to.equal(200);g
        done();
      });
    });

    it('It should return status(400) if supplied menu is empty', (done) => {
      const menu = {};

      request.put({ url: `${baseUrl}/menus/1524960000`, form: menu }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('It should return status(400) if menu is not found', (done) => {
      request.put({ url: `${baseUrl}/menus/19`, form: {} }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });
});
