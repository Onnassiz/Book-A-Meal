import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before } from 'mocha';
import TestUtil from '../testUtil/TestUtil';

const uuidv4 = require('uuid/v4');

const baseUrl = 'http://localhost:3001/api/v1';

let tokenR = '';

const userFormData = {
  email: 'caterer@gmail.com',
  password: 'password',
};

request.post({ url: `${baseUrl}/auth/signIn`, form: userFormData }, (error, response, body) => {
  const { token } = JSON.parse(body);
  tokenR = token;
});

describe('Order Controller', () => {
  describe('Get Orders', () => {
    it('should return status (404) if orders are not found', (done) => {
      request.get({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('Get Orders', () => {
    before((done) => {
      TestUtil.insertOrders(done);
    });

    after((done) => {
      TestUtil.deleteOrders(done);
    });

    it('should return status (200) and array of size 2 if request is made with valid auth token', (done) => {
      request.get({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.have.lengthOf(3);
        done();
      });
    });

    it('should return status (200) if request is made with valid order id', (done) => {
      TestUtil.getOrderId().then((id) => {
        request.get({ url: `${baseUrl}/orders/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(typeof JSON.parse(body)).to.equal('object');
          done();
        });
      });
    });

    it('should return status (404) if request is made with wrong order id', (done) => {
      request.get({ url: `${baseUrl}/orders/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should return status (200) if request is made with correct user id', (done) => {
      TestUtil.getCustomerId().then((id) => {
        request.get({ url: `${baseUrl}/orders/user/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });

    it('should return status (404) if request is made with wrong user id', (done) => {
      request.get({ url: `${baseUrl}/orders/user/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('Post and Put Orders', () => {
    before((done) => {
      TestUtil.insertOrders(done);
    });

    after((done) => {
      TestUtil.deleteOrders(done);
    });

    it('should return status (400) if form validation fails', (done) => {
      const formData = {
        meals: [],
      };

      request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(422);
        done();
      });
    });

    it('should return status (201) if form validation passes and order is created', (done) => {
      TestUtil.getCustomerIdMenuIdProfileIdMealIds().then((res) => {
        const formData = {
          userId: res.id,
          contact: '+23490090234',
          address: '12, Allen Avenue, Close',
          meals: [
            {
              mealId: res.meal_1_Id,
              units: 2,
              price: 200,
              profileId: res.profileId,
              menuId: res.menuId,
            },
            {
              mealId: res.meal_2_Id,
              units: 3,
              price: 400,
              profileId: res.profileId,
              menuId: res.menuId,
            },
          ],
        };

        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
          expect(response.statusCode).to.equal(201);
          done();
        });
      });
    });

    it('should return status (400) if mealId/units is missing in any of the meal entries', (done) => {
      TestUtil.getCustomerIdMenuIdProfileIdMealIds().then((res) => {
        const formData = {
          contact: '+23490090234',
          address: '12, Allen Avenue, Close',
          userId: res.id,
          meals: [
            {
              units: 3,
            },
            {
              mealId: res.meal_2_Id,
              units: 3,
            },
          ],
        };

        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
          expect(response.statusCode).to.equal(422);
          done();
        });
      });
    });

    it('should return status (400) if mealId/units is missing in any of the meal entries', (done) => {
      TestUtil.getCustomerIdMenuIdProfileIdMealIds().then((res) => {
        const formData = {
          contact: '+23490090234',
          address: '12, Allen Avenue, Close',
          userId: res.id,
          meals: [
            {
              mealId: '23123123',
              units: '23123123',
            },
            {
              mealId: res.meal_2_Id,
              units: 3,
            },
          ],
        };

        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
          expect(response.statusCode).to.equal(422);
          done();
        });
      });
    });

    it('should return status (200) when updating order', (done) => {
      TestUtil.getCustomerIdMenuIdProfileIdMealIds().then((res) => {
        const formData = {
          contact: '+23490090234',
          address: '12, Allen Avenue, Close',
          meals: [
            {
              mealId: res.meal_1_Id,
              units: 2,
              price: 200,
              profileId: res.profileId,
              menuId: res.menuId,
            },
            {
              mealId: res.meal_1_Id,
              units: 2,
              price: 200,
              profileId: res.profileId,
              menuId: res.menuId,
            },
          ],
        };

        TestUtil.getOrderId().then((id) => {
          request.put({ url: `${baseUrl}/orders/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
            expect(response.statusCode).to.equal(200);
            done();
          });
        });
      });
    });

    it('should return status (400) when updating order with a wrong mealId, profileId, or menuId', (done) => {
      TestUtil.getCustomerIdMenuIdProfileIdMealIds().then((res) => {
        const formData = {
          contact: '+23490090234',
          address: '12, Allen Avenue, Close',
          meals: [
            {
              mealId: 'wrong_id',
              units: 2,
              price: 200,
              profileId: res.profileId,
              menuId: 'wrong_id',
            },
            {
              mealId: 'wrong_id',
              units: 2,
              price: 200,
              profileId: res.profileId,
              menuId: res.menuId,
            },
          ],
        };

        TestUtil.getOrderId().then((id) => {
          request.put({ url: `${baseUrl}/orders/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
            expect(response.statusCode).to.equal(422);
            done();
          });
        });
      });
    });

    it('should return status (404) when updating an order that does not exist', (done) => {
      TestUtil.getCustomerIdMenuIdProfileIdMealIds().then((res) => {
        const formData = {
          contact: '+23490090234',
          address: '12, Allen Avenue, Close',
          meals: [
            {
              mealId: res.meal_1_Id,
              units: 2,
              price: 200,
              profileId: res.profileId,
              menuId: res.menuId,
            },
            {
              mealId: res.meal_1_Id,
              units: 2,
              price: 200,
              profileId: res.profileId,
              menuId: res.menuId,
            },
          ],
        };

        request.put({ url: `${baseUrl}/orders/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
          expect(response.statusCode).to.equal(404);
          done();
        });
      });
    });

    it('should return status (400) when updating an order that was placed more than 60 mins ago', (done) => {
      TestUtil.getCustomerIdMenuIdProfileIdMealIds().then((res) => {
        const formData = {
          contact: '+23490090234',
          address: '12, Allen Avenue, Close',
          meals: [
            {
              mealId: res.meal_1_Id,
              units: 2,
              price: 200,
              profileId: res.profileId,
              menuId: res.menuId,
            },
            {
              mealId: res.meal_1_Id,
              units: 2,
              price: 200,
              profileId: res.profileId,
              menuId: res.menuId,
            },
          ],
        };

        TestUtil.getLastOrderId().then((id) => {
          request.put({ url: `${baseUrl}/orders/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
            expect(response.statusCode).to.equal(400);
            done();
          });
        });
      });
    });
  });
});
