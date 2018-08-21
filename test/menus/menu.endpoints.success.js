import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before, afterEach } from 'mocha';
import dotenv from 'dotenv';

import { getCatererToken, getCustomerToken, getCatererId, createAdminProfile } from '../../testHelpers/main';
import { deleteMenus, getMealIds, insertOneMenu } from '../../testHelpers/menus/index';
import { deleteProfile } from '../../testHelpers/profile/index';

dotenv.config();
const baseUrl = 'http://localhost:3009/api/v1';

let adminToken = '';

describe('MenuController - Success', () => {
  describe('Post Menu', () => {
    before((done) => {
      getCatererId().then((id) => {
        createAdminProfile(id).then(() => {
          getCatererToken(done).then(((token) => {
            adminToken = token;
          }));
        });
      });
    });

    after((done) => {
      deleteMenus(done, false).then(() => {
        deleteProfile(done);
      });
      adminToken = '';
    });

    afterEach((done) => {
      deleteMenus(done);
    });

    it('should return status (201) and an array object of length 5 when creating a new menu', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 4,
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(201);
          expect(typeof body).to.equal('object');
          expect(body.menus.length).to.equal(5);
          expect(body.message).to.equal('Menu(s) successfully created');
          done();
        });
      });
    });

    it('should return status (201) and an array object of length 1 when creating a new menu without extraDays', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
        };
        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(201);
          expect(typeof body).to.equal('object');
          expect(body.menus.length).to.equal(1);
          expect(body.message).to.equal('Menu(s) successfully created');
          done();
        });
      });
    });
  });

  describe('Put Menu', () => {
    before((done) => {
      getCatererId().then((id) => {
        createAdminProfile(id).then(() => {
          getCatererToken(done).then(((token) => {
            adminToken = token;
          }));
        });
      });
    });

    after((done) => {
      deleteMenus(done, false).then(() => {
        deleteProfile(done);
      });
      adminToken = '';
    });

    it('should return status (200) when updating a menu', (done) => {
      insertOneMenu(done).then((data) => {
        const formData = {
          name: 'Fire Rice',
          date: '2018-08-10',
        };
        request.put({ url: `${baseUrl}/menus/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(typeof body).to.equal('object');
          expect(body.message).to.equal('Menu successfully updated');
          expect(body.menu.name).to.equal('Fire Rice');
          done();
        });
      });
    });

    it('should return status (200) when  updating menu meals', (done) => {
      insertOneMenu(done).then((data) => {
        getMealIds().then((ids) => {
          const formData = {
            meals: [ids[0], ids[2]],
            name: 'Good day',
            date: '2018-08-08',
          };
          request.put({ url: `${baseUrl}/menus/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(typeof body).to.equal('object');
            expect(body.message).to.equal('Menu successfully updated');
            expect(body.menu.mealsCount).to.equal(2);
            done();
          });
        });
      });
    });
  });

  describe('Get Menu', () => {
    let customerToken = '';
    before((done) => {
      getCatererId().then((id) => {
        createAdminProfile(id).then(() => {
          getCustomerToken(done, false).then(((cToken) => {
            customerToken = cToken;
            getCatererToken(done).then(((token) => {
              adminToken = token;
            }));
          }));
        });
      });
    });

    after((done) => {
      deleteMenus(done, false).then(() => {
        deleteProfile(done);
      });
      adminToken = '';
    });

    afterEach((done) => {
      deleteMenus(done);
    });

    it('should return status (200) and 11 menus on GET api/v1/menus', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 11,
        };

        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, () => {
          request.get({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).length).to.equal(10);
            done();
          });
        });
      });
    });

    it('should return status (200) and 11 menus on GET api/v1/menus with customer\'s token', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 11,
        };

        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, () => {
          request.get({ url: `${baseUrl}/menus?date=2018-08-08`, headers: { Authorization: `Bearer ${customerToken}` } }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).length).to.equal(1);
            done();
          });
        });
      });
    });

    it('should return status (200) and 3 menus on GET api/v1/menus with offset and limit', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 11,
        };

        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, () => {
          request.get({ url: `${baseUrl}/menus?limit=3&offset=0`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).length).to.equal(3);
            done();
          });
        });
      });
    });

    it('should return status (200) and 10 menus on GET api/v1/menus/user without offset and limit', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 11,
        };

        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, () => {
          request.get({ url: `${baseUrl}/menus/user`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).count).to.equal(12);
            expect(JSON.parse(body).menus.length).to.equal(10);
            done();
          });
        });
      });
    });

    it('should return status (200) and 5 menus on GET api/v1/menus/user with offset and limit', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 11,
        };

        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, () => {
          request.get({ url: `${baseUrl}/menus/user?offset=0&limit=5`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(JSON.parse(body).count).to.equal(12);
            expect(JSON.parse(body).menus.length).to.equal(5);
            done();
          });
        });
      });
    });

    it('should return status (200) and 1 menu with 20 meals counts on GET api/v1/menus/:id', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 11,
        };

        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (postError, postResponse, postBody) => {
          request.get({ url: `${baseUrl}/menus/${postBody.menus[0].id}`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(typeof JSON.parse(body)).to.equal('object');
            done();
          });
        });
      });
    });
    it('should return status (200) and 10 meals on api/v1/meals/menu/:id', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 11,
        };

        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (postError, postResponse, postBody) => {
          request.get({ url: `${baseUrl}/meals/menu/${postBody.menus[0].id}`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(typeof JSON.parse(body)).to.equal('object');
            expect(JSON.parse(body).length).to.equal(20);
            done();
          });
        });
      });
    });

    it('should return status (200) and 10 meals on api/v1/meals/menus/', (done) => {
      getMealIds().then((ids) => {
        const formData = {
          meals: ids,
          name: 'Fire bons',
          date: '2018-08-08',
          extraDays: 11,
        };

        request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, () => {
          request.get({ url: `${baseUrl}/meals/menus/?date=2018-08-08`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            expect(typeof JSON.parse(body)).to.equal('object');
            expect(JSON.parse(body).meals.length).to.equal(10);
            expect(JSON.parse(body).count).to.equal(20);
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

    it('should return status (200) and a success message when a meal is deleted', (done) => {
      insertOneMenu(done).then((data) => {
        request.delete({ url: `${baseUrl}/menus/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(typeof JSON.parse(body)).to.equal('object');
          expect(JSON.parse(body).message).to.equal('Menu successfully deleted');
          done();
        });
      });
    });
  });
});
