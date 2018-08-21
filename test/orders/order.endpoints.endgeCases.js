import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before } from 'mocha';
import uuidv4 from 'uuid/v4';
import dotenv from 'dotenv';

import { getCustomerToken } from '../../testHelpers/main';
import { deleteOrders, getMealIds, insertOutdatedOrder } from '../../testHelpers/orders';

dotenv.config();
const baseUrl = 'http://localhost:3009/api/v1';

let customerToken = '';

describe('OrderController - Edge Cases', () => {
  describe('Post Order', () => {
    before((done) => {
      getCustomerToken(done).then(((token) => {
        customerToken = token;
      }));
    });

    after((done) => {
      deleteOrders(done);
      customerToken = '';
    });

    it('should return status (401) error status creating an order with invalid user token', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
        };
        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: 'Bearer this is wrong' }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(401);
          expect(typeof body).to.equal('object');
          done();
        });
      });
    });
    
    it('should return status (422) error status when creating an order without contact and address', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
        };
        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(422);
          expect(typeof body).to.equal('object');
          expect(body.contact).to.equal('the phone number field is require');
          expect(body.address).to.equal('the address field is require');
          done();
        });
      });
    });

    it('should return status (422) error status when creating an order without meals array', (done) => {
      const formData = {
        contact: '0821232122',
        address: 'You are not here',
      };
      request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(422);
        expect(typeof body).to.equal('object');
        expect(body.meals).to.equal('the meals field is require');
        done();
      });
    });

    it('should return status (422) error status when creating an order with a meals array that contains wrong UUID', (done) => {
      const formData = {
        meals: [{
          mealId: 'this is not an id',
          units: 1,
          price: 200,
        }],
        contact: '0821232122',
        address: 'You are not here',
      };
      request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(422);
        expect(typeof body).to.equal('object');
        expect(body.meals).to.equal('a meal object must have a meal Id, and the ids must be valid UUID4.');
        done();
      });
    });

    it('should return status (422) error status when creating an order with a meals array that has no mealId', (done) => {
      const formData = {
        meals: [{
          units: 1,
          price: 200,
        }],
        contact: '0821232122',
        address: 'You are not here',
      };
      request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(422);
        expect(typeof body).to.equal('object');
        expect(body.meals).to.equal('a meal object must have a meal Id, and the ids must be valid UUID4.');
        done();
      });
    });

    it('should return status (422) error status when creating an order with a meals that contains no units and price', (done) => {
      const formData = {
        meals: [{
          mealId: uuidv4(),
        }],
        contact: '0821232122',
        address: 'You are not here',
      };
      request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(422);
        expect(typeof body).to.equal('object');
        expect(body.meals).to.equal('at least one of the meals supplied does not have a price. It is also possible you have supplied a price that is not a number.');
        done();
      });
    });

    it('should return status (422) error status when creating an order without contact and address', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
        };
        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(422);
          expect(typeof body).to.equal('object');
          expect(body.contact).to.equal('the phone number field is require');
          expect(body.address).to.equal('the address field is require');
          done();
        });
      });
    });
  });

  describe('Put Order', () => {
    before((done) => {
      getCustomerToken(done).then(((token) => {
        customerToken = token;
      }));
    });

    after((done) => {
      deleteOrders(done);
      customerToken = '';
    });

    it('should return status (404) error status when updating an order that does not exist', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          contact: '08292831232',
          address: 'This is an address',
        };
        request.put({ url: `${baseUrl}/orders/${uuidv4()}`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(404);
          expect(typeof body).to.equal('object');
          expect(body.message).to.equal('Order not found');
          done();
        });
      });
    });

    it('should return status (404) error status when updating an order 60 minutes after it is created', (done) => {
      getMealIds().then((ids) => {
        insertOutdatedOrder().then((oldOrder) => {
          const formData = {
            meals: ids,
            contact: '08292831232',
            address: 'This is an address',
          };

          request.put({ url: `${baseUrl}/orders/${oldOrder.id}`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            expect(typeof body).to.equal('object');
            expect(body.message).to.equal('You cannot modify an order 60 minutes after it is placed');
            done();
          });
        });
      });
    });
  });

  describe('Get Orders', () => {
    before((done) => {
      getCustomerToken(done).then(((token) => {
        customerToken = token;
      }));
    });

    after((done) => {
      deleteOrders(done);
      customerToken = '';
    });

    it('should return status (404) error status when updating an order 60 minutes after it is created', (done) => {
      request.get({ url: `${baseUrl}/orders/${uuidv4()}`, headers: { Authorization: `Bearer ${customerToken}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(typeof JSON.parse(body)).to.equal('object');
        expect(JSON.parse(body).message).to.equal('Order not found');
        done();
      });
    });

    it('should return status (404) error status when updating an order 60 minutes after it is created', (done) => {
      request.get({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(typeof JSON.parse(body)).to.equal('object');
        expect(JSON.parse(body).message).to.equal('Orders not found');
        done();
      });
    });
  });
});
