import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before } from 'mocha';

import TestUil from '../testUtil/TestUtil';

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
			TestUil.insertProfile(done);
		});

		after((done) => {
			TestUil.deleteProfiles(done);
		});

		it('should return status (200) and an object if request is made with auth token', (done) => {
			TestUil.getUserId().then((id) => {
				request.get({ url: `${baseUrl}/profile/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});
	});

	describe('Post Profile', () => {
		before((done) => {
			TestUil.insertProfile(done);
		});

		after((done) => {
			TestUil.deleteProfiles(done);
		});

		it('should return status (200) and an object if form data is valid', (done) => {
			TestUil.getUserId().then((id) => {
				const formData = {
					businessName: 'Just eat',
					contact: '080321231232',
					email: 'justeat@gmail.com',
					mission: 'Feeding the richest',
					banner: 'http://banner.com',
					userId: id,
				};

				request.post({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					expect(typeof JSON.parse(body)).to.equal('object');
					done();
				});
			});
		});

		it('should return status (400) if form data is not valid', (done) => {
			TestUil.getUserId().then((id) => {
				const formData = {
					businessName: 'Just eat',
					contact: '080321231232',
					email: 'justeatgmail.com',
					mission: 'Feeding the richest',
					banner: 'httpbanner.com',
					userId: id,
				};

				request.post({ url: `${baseUrl}/profile`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});


		it('should return status (200) when updating profile', (done) => {
			TestUil.getProfileId().then((id) => {
				const formData = {
					businessName: 'Just eat',
					contact: '080321231232',
					email: 'justeat@gmail.com',
					mission: 'Feeding the richest',
					banner: 'http://banner.com',
				};

				request.put({ url: `${baseUrl}/profile/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});
	});
});