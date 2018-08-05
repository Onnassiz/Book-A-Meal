import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before, afterEach } from 'mocha';
import dotenv from 'dotenv';

import { getCatererToken } from '../../testHelpers/main';
import { deleteProfile, insertProfile } from '../../testHelpers/profile/index';

dotenv.config();
const baseUrl = 'http://localhost:3001/api/v1';

let adminToken = '';

describe('Profile Controller - Success Cases', () => {
  describe('Post Profile', () => {
    before((done) => {
      getCatererToken(done).then(((token) => {
        adminToken = token;
      }));
    });

    after((done) => {
      deleteProfile(done);
      adminToken = '';
    });

    it('should return status (201) and a profile object when profile is created', (done) => {
      const formData = {
        businessName: 'Your name',
        mission: 'Your mission',
        contact: 'Your this is your contact',
        email: 'benjamin@gmail.com',
        banner: 'https://youcan.com',
      };
      request.post({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(201);
        expect(typeof body).to.equal('object');
        done();
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
      insertProfile(done).then((data) => {
        const formData = {
          mission: 'Your mission',
          contact: 'Your this is your contact',
        };
        request.put({ url: `${baseUrl}/profile/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(typeof body).to.equal('object');
          done();
        });
      });
    });

    it('should return status (200) and a profile when updating a profile with banner', (done) => {
      insertProfile(done).then((data) => {
        const formData = {
          mission: 'Your mission',
          banner: 'https://youcan.com',
        };
        request.put({ url: `${baseUrl}/profile/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(typeof body).to.equal('object');
          done();
        });
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
      insertProfile(done).then(() => {
        request.get({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${adminToken}` } }, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(typeof JSON.parse(body)).to.equal('object');
          done();
        });
      });
    });

    // it('should return status (200) and a profile when updating a profile with banner', (done) => {
    //   insertProfile().then((data) => {
    //     const formData = {
    //       mission: 'Your mission',
    //       banner: 'https://youcan.com',
    //     };
    //     request.put({ url: `${baseUrl}/profile/${data.id}`, headers: { Authorization: `Bearer ${adminToken}` }, json: formData }, (error, response, body) => {
    //       expect(response.statusCode).to.equal(200);
    //       expect(typeof body).to.equal('object');
    //       done();
    //     });
    //   });
    // });
  });
});
