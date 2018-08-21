import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before } from 'mocha';
import dotenv from 'dotenv';

import { getCustomerToken } from '../../testHelpers/main';
import { deleteOrders, insertOneOrder, getMealIds } from '../../testHelpers/orders';

dotenv.config();
const baseUrl = 'http://localhost:3009/api/v1';

let customerToken = '';

describe('OrderController - Success', () => {
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

    it('should return status (201) and an object when a new order is created', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          contact: '08134234232',
          address: 'You have the heart of a king.',
        };
        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(201);
          expect(typeof body).to.equal('object');
          expect(body.message).to.equal('Order successfully created');
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

    it('should return status (200) and an object when an order is updated', (done) => {
      insertOneOrder().then((data) => {
        getMealIds().then((ids) => {
          const formData = {
            meals: ids,
            contact: '08134234232',
            address: 'You have the heart of a king.',
          };
          request.put({ url: `${baseUrl}/orders/${data.id}`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(typeof body).to.equal('object');
            expect(body.message).to.equal('Order successfully updated');
            done();
          });
        });
      });
    });
  });

  describe('Get Order', () => {
    before((done) => {
      getCustomerToken(done).then(((token) => {
        customerToken = token;
      }));
    });

    after((done) => {
      deleteOrders(done);
      customerToken = '';
    });

    it('should return status (200) and an object when fetching order by user id', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          contact: '08134234232',
          address: 'You have the heart of a king.',
        };
        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, () => {
          request.get({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(typeof body).to.equal('object');
            expect(body.count).to.equal(1);
            done();
          });
        });
      });
    });

    it('should return status (200) and an object when fetching order by id', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          contact: '08134234232',
          address: 'You have the heart of a king.',
        };
        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (err, req, body1) => {
          request.get({ url: `${baseUrl}/orders/${body1.order.id}`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(typeof body).to.equal('object');
            done();
          });
        });
      });
    });

    it('should return status (200) and an object when fetching the meals in an order', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          contact: '08134234232',
          address: 'You have the heart of a king.',
        };
        request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (err, res, body1) => {
          request.get({ url: `${baseUrl}/meals/order/${body1.order.id}`, headers: { Authorization: `Bearer ${customerToken}` }, json: formData }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(typeof body).to.equal('object');
            expect(body.length).to.equal(10);
            done();
          });
        });
      });
    });
  });
});
