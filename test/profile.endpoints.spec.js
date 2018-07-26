import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before } from 'mocha';
import TestUil from '../testUtil/TestUtil';

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

describe('Profile Controller', () => {
  describe('Get Profile', () => {
    before((done) => {
      TestUil.insertProfile(done, true);
    });

    after((done) => {
      TestUil.deleteProfiles(done, true);
    });

    it('should return status (200) and an object if request is made with a valid profile ID', (done) => {
      request.get({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('Get Empty Profile', () => {
    before((done) => {
      TestUil.deleteProfiles(done, true);
    });

    it('should return status (404) and an object if request profile is not found', (done) => {
      request.get({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should return status (200) and an object if form validation passes and profile is created', (done) => {
      const formData = {
        businessName: 'Just eat',
        contact: '080321231232',
        email: 'justEat@gmail.com',
        mission: 'Feeding the richest',
        banner: 'http://banner.com',
      };

      request.post({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(201);
        done();
      });
    });
  });

  describe('Post Profile', () => {
    before((done) => {
      TestUil.insertProfile(done, true);
    });

    after((done) => {
      TestUil.deleteProfiles(done, true);
    });

    it('should return status (400) if form data is valid but user already created a profile', (done) => {
      const formData = {
        businessName: 'Just eat',
        contact: '080321231232',
        email: 'justEat@gmail.com',
        mission: 'Feeding the richest',
        banner: 'http://banner.com',
      };

      request.post({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('should return status (400) if form data is not valid', (done) => {
      const formData = {
        businessName: 'Just eat',
        contact: '080321231232',
        email: 'justEatGmail.com',
        mission: 'Feeding the richest',
        banner: 'httpBanner.com',
      };

      request.post({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(422);
        done();
      });
    });


    it('should return status (200) when updating profile', (done) => {
      TestUil.getProfileId().then((id) => {
        const formData = {
          businessName: 'Just eat',
          contact: '080321231232',
          email: 'justEat@gmail.com',
          mission: 'Feeding the richest',
          banner: 'http://banner.com',
        };

        request.put({ url: `${baseUrl}/profile/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });

    it('should return status (200) when updating profile banner', (done) => {
      TestUil.getProfileId().then((id) => {
        const formData = {
          banner: 'http://banner.com',
        };

        request.put({ url: `${baseUrl}/profile/image/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });

    it('should return status (404) when updating profile banner for profile that does not exist', (done) => {
      TestUil.getProfileId().then(() => {
        const formData = {
          banner: 'http://banner.com',
        };

        request.put({ url: `${baseUrl}/profile/image/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
          expect(response.statusCode).to.equal(404);
          done();
        });
      });
    });

    it('should return status (400) when updating profile banner with wrong banner URL', (done) => {
      TestUil.getProfileId().then((id) => {
        const formData = {
          banner: 'Banner',
        };

        request.put({ url: `${baseUrl}/profile/image/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
          expect(response.statusCode).to.equal(422);
          done();
        });
      });
    });

    it('should return status (404) when updating profile that does not exist', (done) => {
      const formData = {
        businessName: 'Just eat',
        contact: '080321231232',
        email: 'justEat@gmail.com',
        mission: 'Feeding the richest',
        banner: 'http://banner.com',
      };

      request.put({ url: `${baseUrl}/profile/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
