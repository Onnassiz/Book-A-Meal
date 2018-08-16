import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before, afterEach } from 'mocha';
import dotenv from 'dotenv';
import uuidv4 from 'uuid/v4';

import { getCatererToken } from '../../testHelpers/main';
import { deleteMenus, getMealIds, insertOneMenu } from '../../testHelpers/menus/index';

dotenv.config();
const baseUrl = 'http://localhost:3009/api/v1';

let adminToken = '';

describe('MenuController - Edge Cases', () => {
  describe('Post Menu', () => {
    before((done) => {
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    afterEach((done) => {
      deleteMenus(done);
    });

    after((done) => {
      deleteMenus(done);
      adminToken = '';
    });

    it('should return status (401) when request is done without token', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 4,
        };
        request.post({ url: `${baseUrl}/menus`, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(401);
          expect(body.message).to.equal('You are not authorized to consume this resource. Please sign in');
          done();
        });
      });
    });

    it('should return status (401) when request is made with wrong auth token', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}and this one` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(401);
          expect(body.message).to.equal('You are not authorized to consume this resource. Please sign in');
          done();
        });
      });
    });

    it('should return status (422) when request is made with invalid request data', (done) => {
      getMealIds().then(() => {
        const formData = {
          meals: 4,
          name: 1234,
          date: 'this is not',
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(422);
          expect(body.date).to.equal('the date supplied is not a valid date');
          expect(body.name).to.equal('the menu name must be a string');
          expect(body.meals).to.equal('the meals field must an array');
          done();
        });
      });
    });

    it('should return status (422) when request is made with invalid request data', (done) => {
      getMealIds().then(() => {
        const formData = {
          meals: [1, 2, 3],
          name: '1234',
          date: '2010-10-10',
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(422);
          expect(body.meals).to.equal('at least one of the objects in the array does not have the \'mealId\' or the id is not a valid UUID4 id');
          done();
        });
      });
    });

    it('should return status (422) when request is made with invalid request data', (done) => {
      getMealIds().then(() => {
        const formData = {
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(422);
          expect(body.date).to.equal('the date field is required');
          expect(body.meals).to.equal('the meals field is required');
          done();
        });
      });
    });

    it('should return status (400) when daily menu has already been created', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 4,
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, () => {
          request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            expect(body.message).to.equal('You have already created a menu for the selected date. You can still modify the already created menu');
            done();
          });
        });
      });
    });

    it('should return status (422) when mealId is invalid', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids.concat({ mealId: '212321', price: 200 }),
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 4,
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response) => {
          expect(response.statusCode).to.equal(422);
          done();
        });
      });
    });

    it('should return status (422) when mealId is invalid', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids.concat({ mealId: '212321', price: 200 }),
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 4,
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response) => {
          expect(response.statusCode).to.equal(422);
          done();
        });
      });
    });

    it('should return status (422) when extraDays is not a number', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 'your name',
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(422);
          expect(body.extraDays).to.equal('the extra day field must be an integer');
          done();
        });
      });
    });

    // it('should return status (400) when daily menu has already been created', (done) => {
    //   getMealIds().then((ids) => {
    //     const formData = {
    //       meals: ids.concat([{
    //         mealId: uuidv4(),
    //         price: 123,
    //       }]),
    //       name: 'Fire bons',
    //       date: '2018-08-08',
    //     };
    //     request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
    //       expect(response.statusCode).to.equal(400);
    //       expect(body.message).to.equal('SequelizeForeignKeyConstraintError');
    //       done();
    //     });
    //   });
    // });
  });

  describe('Put Menu', () => {
    before((done) => {
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    after((done) => {
      deleteMenus(done);
      adminToken = '';
    });

    afterEach((done) => {
      deleteMenus(done);
    });

    it('should return status (401) when request is made without a token', (done) => {
      insertOneMenu(done).then((data) => {
        const formData = {
          name: 'Fire Rice',
          date: '2018-08-10',
        };
        request.put({ url: `${baseUrl}/menus/${data.id}`, headers: { }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(401);
          expect(body.message).to.equal('You are not authorized to consume this resource. Please sign in');
          done();
        });
      });
    });

    it('should return status (401) when request is made without invalid token', (done) => {
      insertOneMenu(done).then((data) => {
        const formData = {
          name: 'Fire Rice',
          date: '2018-08-10',
        };
        request.put({ url: `${baseUrl}/menus/${data.id}`, headers: { Authorization: 'welcome' }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(401);
          expect(body.message).to.equal('You are not authorized to consume this resource. Please sign in');
          done();
        });
      });
    });

    it('should return status (422) when request is made invalid formData', (done) => {
      insertOneMenu(done).then((data) => {
        const formData = {
          date: '12123adf',
          meals: '12123adf',
        };
        request.put({ url: `${baseUrl}/menus/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response) => {
          expect(response.statusCode).to.equal(422);
          done();
        });
      });
    });

    // it('should return status (404) when updating menu that does not exist', (done) => {
    //   insertOneMenu(done).then(() => {
    //     const formData = {
    //       date: '2019-02-02',
    //     };
    //     request.put({ url: `${baseUrl}/menus/${uuidv4()}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
    //       expect(response.statusCode).to.equal(404);
    //       expect(body.message).to.equal('Menu not found');
    //       done();
    //     });
    //   });
    // });

    // it('should return status (400) when updating to a date that already has a menu', (done) => {
    //   getMealIds().then((ids) => {
    //     const formData = {
    //       meals: ids,
    //       name: 'Fire bons',
    //       date: '2018-08-08',
    //       extraDays: 4,
    //     };
    //     request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (postError, postResponse, postBody) => {
    //       const formUpdate = {
    //         date: '2018-08-08',
    //       };
    //       request.put({ url: `${baseUrl}/menus/${postBody.menus[1].id}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formUpdate }, (error, response) => {
    //         expect(response.statusCode).to.equal(400);
    //         done();
    //       });
    //     });
    //   });
    // });

    it('should return status (422) when updating a menu with wrong mealId', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 4,
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (postError, postResponse, postBody) => {
          const formUpdate = {
            meals: ids.concat({ mealId: '123213', price: 300 }),
            date: '2018-08-08',
          };
          request.put({ url: `${baseUrl}/menus/${postBody.menus[1].id}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formUpdate }, (error, response) => {
            expect(response.statusCode).to.equal(422);
            done();
          });
        });
      });
    });
  });

  describe('Delete Menu', () => {
    before((done) => {
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    afterEach((done) => {
      deleteMenus(done);
    });

    after((done) => {
      deleteMenus(done);
      adminToken = '';
    });

    it('should return status (404) when deleting a meal that does not exist', (done) => {
      request.delete({ url: `${baseUrl}/menus/${uuidv4()}`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(typeof JSON.parse(body)).to.equal('object');
        expect(JSON.parse(body).message).to.equal('Menu not found');
        done();
      });
    });
  });
});
