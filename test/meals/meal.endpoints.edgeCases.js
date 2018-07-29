import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before, afterEach } from 'mocha';
import dotenv from 'dotenv';
import uuidv4 from 'uuid/v4';

import { getCatererToken } from '../../testHelpers/main';
import { deleteMeals, insertOneMeal, insertMock, getMealId } from '../../testHelpers/meals/index';

dotenv.config();
const baseUrl = 'http://localhost:3001/api/v1';

let adminToken = '';

describe('MealController - Edge Cases', () => {
  describe('Post Meal', () => {
    before((done) => {
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    after((done) => {
      deleteMeals(done);
      adminToken = '';
    });

    it('should return (401) if request is made without a token', (done) => {
      const formData = {
        name: 'Fire bons',
        price: 2000,
        category: 'Hot meal',
        imageUrl: 'http://bens.com',
      };
      request.post({ url: `${baseUrl}/meals`, form: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(401);
        expect(JSON.parse(body).message).to.equal('You are not authorized to consume this resource. Please sign in');
        done();
      });
    });

    it('should return (401) if request is made with wrong auth a token', (done) => {
      const formData = {
        name: 'Fire bons',
        price: 2000,
        category: 'Hot meal',
        imageUrl: 'http://bens.com',
      };
      request.post({ url: `${baseUrl}/meals`, headers: { Authorization: 'Bearer one up on down - you re wrong' }, form: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(401);
        expect(JSON.parse(body).message).to.equal('You are not authorized to consume this resource. Please sign in');
        done();
      });
    });

    it('should return (422) if request is made with mission formData fields', (done) => {
      const formData = {

      };
      request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${adminToken}` }, form: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(422);
        expect(JSON.parse(body).name).to.equal('the name field is require');
        expect(JSON.parse(body).category).to.equal('the category field is require');
        expect(JSON.parse(body).price).to.equal('the price field is require');
        done();
      });
    });

    it('should return (422) if request is made with invalid formData', (done) => {
      const formData = {
        name: 1232,
        price: '200sdf0',
        category: true,
        imageUrl: false,
      };
      request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(422);
        expect(body.name).to.equal('the meal name must be a string');
        expect(body.category).to.equal('the category field must be a string');
        expect(body.price).to.equal('the price field must must an integer');
        expect(body.imageUrl).to.equal('image link must be a URL');
        done();
      });
    });

    it('should return (409) if user tries creating a meal twice', (done) => {
      const formData = {
        name: 'Fire bons',
        price: 2000,
        category: 'Hot meal',
        imageUrl: 'http://bens.com',
      };
      request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, () => {
        request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(409);
          expect(body.message).to.equal('You have already created a meal with this name');
          done();
        });
      });
    });
  });

  describe('Put Meal', () => {
    before((done) => {
      getCatererToken(done).then((token) => {
        adminToken = token;
      });
    });

    afterEach((done) => {
      deleteMeals(done);
    });

    after(() => {
      adminToken = '';
    });

    it('should return (404) when updating a meal with wrong uuid', (done) => {
      const formData = {
        name: 'New meal',
        price: 2000,
        description: 'The meal is good',
        category: 'Hot meal',
        imageUrl: 'http://bens.com',
      };

      insertOneMeal(done).then(() => {
        request.put({ url: `${baseUrl}/meals/${uuidv4()}`, headers: { Authorization: `Bearer ${adminToken}` }, form: formData }, (error, response) => {
          expect(response.statusCode).to.equal(404);
          done();
        });
      });
    });

    it('should return (422) when updating a meal with wrong uuid format', (done) => {
      const formData = {
        name: 'New meal',
        price: 2000,
        description: 'The meal is good',
        category: 'Hot meal',
        imageUrl: 'http://bens.com',
      };

      insertOneMeal(done).then(() => {
        request.put({ url: `${baseUrl}/meals/updating`, headers: { Authorization: `Bearer ${adminToken}` }, form: formData }, (error, response) => {
          expect(response.statusCode).to.equal(422);
          done();
        });
      });
    });

    it('should return (200) and a meal object when updating meal Image URL', (done) => {
      const formData = {
        imageUrl: 'http://image.com',
      };

      insertOneMeal(done).then((data) => {
        request.put({ url: `${baseUrl}/meals/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` }, form: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(typeof JSON.parse(body)).to.equal('object');
          expect(JSON.parse(body).imageUrl).to.equal('http://image.com');
          done();
        });
      });
    });
  });

  describe('Delete Meal', () => {
    before((done) => {
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    after((done) => {
      deleteMeals(done);
      adminToken = '';
    });

    it('should return (404) when deleting a meal that does not exist', (done) => {
      insertOneMeal().then(() => {
        request.delete({ url: `${baseUrl}/meals/${uuidv4()}`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
          expect(response.statusCode).to.equal(404);
          expect(JSON.parse(body).message).to.equal('Meal not found');
          done();
        });
      });
    });

    it('should return (422) when deleting a meal with wrong uuid format', (done) => {
      insertOneMeal().then(() => {
        request.delete({ url: `${baseUrl}/meals/wrong`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
          expect(response.statusCode).to.equal(422);
          expect(JSON.parse(body).id).to.equal('wrong id format in params. id must be a valid UUID4');
          done();
        });
      });
    });
  });
});
