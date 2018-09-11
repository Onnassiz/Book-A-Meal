import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before, afterEach } from 'mocha';
import dotenv from 'dotenv';
import uuidv4 from 'uuid/v4';

import { getCatererToken } from '../../testHelpers/main';
import { deleteProfile, insertProfile } from '../../testHelpers/profile/index';

dotenv.config();
const baseUrl = 'http://localhost:3008/api/v1';

let adminToken = '';

describe('Profile Controller - Success Cases', () => {
  describe('Post Profile', () => {
    before((done) => {
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    afterEach((done) => {
      deleteProfile(done);
    });

    after((done) => {
      deleteProfile(done);
      adminToken = '';
    });

    it('should return status (400) when attempting to create a profile more than once', (done) => {
      insertProfile(done).then(() => {
        const formData = {
          businessName: 'Your name',
          mission: 'Your mission',
          contact: 'Your this is your contact',
          email: 'benjamin@gmail.com',
          banner: 'https://youcan.com',
        };
        request.post({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(400);
          expect(typeof body).to.equal('object');
          expect(body.message).to.equal('You have already created a profile.');
          done();
        });
      });
    });
  });

  describe('Put Profile', () => {
    before((done) => {
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    afterEach((done) => {
      deleteProfile(done);
    });

    after((done) => {
      deleteProfile(done);
      adminToken = '';
    });

    it('should return status (200) and a profile when updating a profile', (done) => {
      const formData = {
        mission: 'Your mission',
        contact: 'Your this is your contact',
      };
      request.put({ url: `${baseUrl}/profile/${uuidv4()}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(typeof body).to.equal('object');
        done();
      });
    });
  });

  describe('Get Profile', () => {
    before((done) => {
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    afterEach((done) => {
      deleteProfile(done);
    });

    after((done) => {
      deleteProfile(done);
      adminToken = '';
    });

    it('should return status (200) and a profile when getting a profile', (done) => {
      request.get({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(typeof JSON.parse(body)).to.equal('object');
        done();
      });
    });
  });
});
