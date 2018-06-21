import request from 'request';
import { expect } from 'chai';
import { describe, it, after } from 'mocha';

import TestUtil from '../testUtil/TestUtil';

const baseUrl = 'http://localhost:3001/api/v1';

describe('Handle Not Found', () => {
  it('should return status (404) with message if route is not found', (done) => {
    request.get({ url: `${baseUrl}/authWrong` }, (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      expect(JSON.parse(body).message).to.equal('The resource you are trying to consume does not exist');
      done();
    });
  });
});

describe('AuthController', () => {
  after((done) => {
    TestUtil.deleteUser('onnassiz@gmail.com', done);
  });

  describe('SignUp', () => {
    it('should return status (400) if form is empty', (done) => {
      const formData = {
        fullName: '',
        email: '',
        password: '',
      };

      request.post({ url: `${baseUrl}/auth/signUp`, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('should return status (400) if wrong email', (done) => {
      const formData = {
        fullName: '',
        email: 'something.co',
        password: '',
      };

      request.post({ url: `${baseUrl}/auth/signUp`, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('should return status (400) if password is too short', (done) => {
      const formData = {
        fullName: '',
        email: '',
        password: 'pass',
      };

      request.post({ url: `${baseUrl}/auth/signUp`, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('should return status(201) with a token of length greater than 100', (done) => {
      const formData = {
        fullName: 'Onah Benjamin',
        email: 'onnassiz@gmail.com',
        password: 'password',
      };

      request.post({ url: `${baseUrl}/auth/signUp`, form: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(201);
        expect(JSON.parse(body).token).to.have.lengthOf.above(100);
        done();
      });
    });

    it('should return a status(400) if email already exist', (done) => {
      const formData = {
        fullName: 'Onah Benjamin',
        email: 'caterer@gmail.com',
        password: 'password',
      };

      request.post({ url: `${baseUrl}/auth/signUp`, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });


  describe('SignIn', () => {
    it('should return status (400) if form is empty', (done) => {
      const formData = {
        email: '',
        password: '',
      };

      request.post({ url: `${baseUrl}/auth/signIn`, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('should return status (400) if wrong email', (done) => {
      const formData = {
        email: 'sass.co',
        password: '',
      };

      request.post({ url: `${baseUrl}/auth/signIn`, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });

    it('should return a token with length longer that is 100', (done) => {
      const formData = {
        email: 'caterer@gmail.com',
        password: 'password',
      };

      request.post({ url: `${baseUrl}/auth/signIn`, form: formData }, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(JSON.parse(body).token).to.have.lengthOf.above(100);
        done();
      });
    });

    it('should return status (404) if user is not found', (done) => {
      const formData = {
        email: 'trouser@gmail.com',
        password: 'password',
      };

      request.post({ url: `${baseUrl}/auth/signIn`, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });

    it('should return status (404) if password not verified', (done) => {
      const formData = {
        email: 'caterer@gmail.com',
        password: 'wrongPassword',
      };

      request.post({ url: `${baseUrl}/auth/signIn`, form: formData }, (error, response) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});

