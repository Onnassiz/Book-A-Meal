import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before, afterEach } from 'mocha';
import dotenv from 'dotenv';

import { getCatererToken } from '../../testHelpers/main';
import { deleteMenus, getMealIds, insertOneMenu } from '../../testHelpers/menus/index';

dotenv.config();
const baseUrl = 'http://localhost:3001/api/v1';

let adminToken = '';

describe('MenuController - Success', () => {
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

    it('should return status (201) and an array object of length 5 when creating a new meal', (done) => {
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

    it('should return status (201) and an array object of length 1 when creating a new meal without extraDays', (done) => {
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
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    after((done) => {
      deleteMenus(done);
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
  });
});
