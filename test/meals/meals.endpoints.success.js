import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before, afterEach } from 'mocha';
import dotenv from 'dotenv';

import { getCatererToken } from '../../testHelpers/main';
import { deleteMeals, insertOneMeal, insertMealMock, getMealId } from '../../testHelpers/meals/index';

dotenv.config();
const baseUrl = 'http://localhost:3001/api/v1';

let adminToken = '';

describe('MealController - Success', () => {
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

    it('should return (201) and a meal object when a meal is created', (done) => {
      const formData = {
        name: 'Fire bons',
        price: 2000,
        category: 'Hot meal',
        imageUrl: 'http://bens.com',
      };
      request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${adminToken}` }, form: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(201);
        expect(typeof JSON.parse(body)).to.equal('object');
        expect(JSON.parse(body).meal.name).to.equal('Fire bons');
        done();
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

    it('should return (200) and a meal object when a meal is updated', (done) => {
      const formData = {
        name: 'New meal',
        price: 2000,
        description: 'The meal is good',
        category: 'Hot meal',
        imageUrl: 'http://bens.com',
      };

      insertOneMeal(done).then((data) => {
        request.put({ url: `${baseUrl}/meals/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` }, form: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(typeof JSON.parse(body)).to.equal('object');
          expect(JSON.parse(body).meal.name).to.equal('New meal');
          done();
        });
      });
    });

    it('should return (200) and a meal object when not all the fields are being updated', (done) => {
      const formData = {
        price: 3000,
      };

      insertOneMeal(done).then((data) => {
        request.put({ url: `${baseUrl}/meals/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` }, form: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(typeof JSON.parse(body)).to.equal('object');
          expect(JSON.parse(body).meal.price).to.equal(3000);
          expect(JSON.parse(body).meal.name).to.equal('The Good Meal');
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
          expect(JSON.parse(body).meal.imageUrl).to.equal('http://image.com');
          done();
        });
      });
    });
  });

  describe('Get Meals - Pagination', () => {
    before((done) => {
      insertMealMock().then(() => {
        getCatererToken(done).then(((token) => {
          adminToken = token;
        }));
      });
    });

    after((done) => {
      deleteMeals(done);
      adminToken = '';
    });

    it('should return (200) and a an array of 10 meals', (done) => {
      request.get({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).meals.length).to.equal(10);
        expect(JSON.parse(body).count).to.equal(40);
        done();
      });
    });

    it('should return (200) and a an array of 20 meals when limit=20 and offset=0', (done) => {
      request.get({ url: `${baseUrl}/meals?limit=20&offset=0`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).meals.length).to.equal(20);
        done();
      });
    });

    it('should return (200) and a an array of 1 item when searchKey is passed', (done) => {
      request.get({ url: `${baseUrl}/meals?searchKey=Aristolochiaceae`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).meals.length).to.equal(1);
        expect(JSON.parse(body).meals[0].name).to.equal('Aristolochiaceae');
        done();
      });
    });

    it('should return (200) and a an array of 40 when meals/user is referenced with the right limit and offset', (done) => {
      request.get({ url: `${baseUrl}/meals/user?limit=40&offset=0`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).length).to.equal(40);
        done();
      });
    });

    it('should return (200) and a an array of 10 when meals/user is referenced without limit and offset', (done) => {
      request.get({ url: `${baseUrl}/meals/user`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).length).to.equal(10);
        done();
      });
    });

    it('should return (200) and a meal object when meals/:id is referenced', (done) => {
      getMealId().then((id) => {
        request.get({ url: `${baseUrl}/meals/${id}`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response) => {
          expect(response.statusCode).to.equal(200);
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

    it('should return (200) and a message when meal is successfully deleted', (done) => {
      insertOneMeal().then((data) => {
        request.delete({ url: `${baseUrl}/meals/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).message).to.equal('Meal successfully deleted');
          done();
        });
      });
    });
  });
});
