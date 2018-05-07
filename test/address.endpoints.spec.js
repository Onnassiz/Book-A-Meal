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


describe('Address Controller', () => {
	describe('Get Address', () => {
		before((done) => {
			TestUil.insertAddresses(done);
		});

		after((done) => {
			TestUil.deleteAddresses(done);
		});

		it('should return status (200) and array of size 2 if request is made with auth token', (done) => {
			TestUil.getCustomerId().then((id) => {
				request.get({ url: `${baseUrl}/address/user/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					expect(JSON.parse(body)).to.have.lengthOf(2);
					done();
				});
			});
		});

		it('should return status (200) and if request is made with address id', (done) => {
			TestUil.getAddressId().then((id) => {
				request.get({ url: `${baseUrl}/address/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					expect(typeof JSON.parse(body)).to.equal('object');
					done();
				});
			});
		});
	});

	describe('Post Address', () => {
		before((done) => {
			TestUil.insertAddresses(done);
		});

		after((done) => {
			TestUil.deleteAddresses(done);
		});

		it('should return status (200) and an object if form data is valid', (done) => {
			TestUil.getCustomerId().then((id) => {
				const formData = {
					streetAddress: 'Aba',
					city: 'Ikeja',
					state: 'Lagos',
					userId: id,
				};

				request.post({ url: `${baseUrl}/address`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					expect(typeof JSON.parse(body)).to.equal('object');
					done();
				});
			});
		});

		it('should return status (400) if form data is not valid', (done) => {
			TestUil.getCustomerId().then(() => {
				const formData = {
					streetAddress: '',
					city: 'Ikeja',
					state: 'Lagos',
					userId: '',
				};

				request.post({ url: `${baseUrl}/address`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});

		it('should return status (400) if form data is valid but user Id is wrong', (done) => {
			TestUil.getCustomerId().then(() => {
				const formData = {
					streetAddress: 'Allen',
					city: 'Ikeja',
					state: 'Lagos',
					userId: 'wrong',
				};

				request.post({ url: `${baseUrl}/address`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});

		it('should return status (200) when updating address', (done) => {
			TestUil.getCustomerId().then((id) => {
				const formData = {
					streetAddress: 'Arsenal',
					city: 'Ikeja',
					state: 'Lagos',
					userId: id,
				};

				request.put({ url: `${baseUrl}/address/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});

		it('should return status (400) when updating address with wrong user id', (done) => {
			TestUil.getCustomerId().then((id) => {
				const formData = {
					streetAddress: 'Arsenal',
					city: 'Ikeja',
					state: 'Lagos',
					userId: 'wrong',
				};

				request.put({ url: `${baseUrl}/address/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});
	});
});
