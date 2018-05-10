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

describe('Meal Controller', () => {
	describe('GetMeals', () => {
		before((done) => {
			TestUil.insertMeals(done, true);
		});

		after((done) => {
			TestUil.deleteMeals(done);
		});

		it('should return forbidden (403) if request is made without token', (done) => {
			request.get({ url: `${baseUrl}/meals` }, (error, response) => {
				expect(response.statusCode).to.equal(403);
				done();
			});
		});

		it('should return forbidden (403) if request is made wrong token', (done) => {
			request.get({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer jskdfjk` } }, (error, response) => {
				expect(response.statusCode).to.equal(403);
				done();
			});
		});

		it('should return Ok (200) with array of size(2) if request is made with auth token', (done) => {
			request.get({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
				expect(response.statusCode).to.equal(200);
				expect(JSON.parse(body)).to.have.lengthOf(2);
				done();
			});
		});

		it('should return Ok (200) with a meal object for request with valid ID', (done) => {
			TestUil.getMealId().then((id) => {
				request.get({ url: `${baseUrl}/meals/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					expect(typeof JSON.parse(body)).to.equal('object');
					done();
				});
			});
		});

		it('should return Ok (200) with a user and meals object object for request with valid ID', (done) => {
			TestUil.getUserId().then((id) => {
				request.get({ url: `${baseUrl}/meals/user/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					expect(typeof JSON.parse(body).meals).to.equal('object');
					done();
				});
			});
		});
	});

	describe('Post and Put Meals', () => {
		before((done) => {
			TestUil.insertMeals(done, true);
		});

		after((done) => {
			TestUil.deleteMeals(done);
		});

		it('should return forbidden (403) if request is made without token', (done) => {
			TestUil.getUserId().then((id) => {
				const formData = {
					name: 'Fire bons',
					price: 2000,
					category: 'Hot meal',
					userId: id,
					imageUrl: 'http://bens.com',
				};
				request.post({ url: `${baseUrl}/meals`, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(403);
					done();
				});
			});
		});

		it('should return status (400) when form validation fails', (done) => {
			TestUil.getUserId().then((id) => {
				const formData = {
					name: '',
					price: 2000,
					category: 'Hot meal',
					userId: id,
					imageUrl: 'httcom',
				};
				request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});

		it('should return status (200) when form validation passes', (done) => {
			TestUil.getUserId().then((id) => {
				const formData = {
					name: 'Eba and Sweet',
					price: 2000,
					category: 'Hot meal',
					userId: id,
					imageUrl: 'http://seri.com',
				};
				request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});

		it('should return status (200) when modifying meal', (done) => {
			TestUil.getUserId().then((id) => {
				const formData = {
					name: 'Eba and Sweet',
					price: 2000,
					category: 'Hot meal',
					userId: id,
					imageUrl: 'http://seri.com',
				};

				TestUil.getMealId().then((mealId) => {
					request.put({ url: `${baseUrl}/meals/${mealId}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
						expect(response.statusCode).to.equal(200);
						done();
					});
				});
			});
		});

	it('should return status (400) when modifying meal with wrong user id', (done) => {
			TestUil.getUserId().then((id) => {
				const formData = {
					name: 'Eba and Sweet',
					price: 2000,
					category: 'Hot meal',
					userId: 'wronguserid',
					imageUrl: 'http://seri.com',
				};

				TestUil.getMealId().then((mealId) => {
					request.put({ url: `${baseUrl}/meals/${mealId}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
						expect(response.statusCode).to.equal(400);
						done();
					});
				});
			});
		});

		it('should return status (400) when wrong image url is used', (done) => {
			const formData = {
				imageUrl: 'wrongurl',
			};

			TestUil.getMealId().then((mealId) => {
				request.put({ url: `${baseUrl}/meals/image/${mealId}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});

		it('should return status (200) when correct image url is used', (done) => {
			const formData = {
				imageUrl: 'http://correct.url',
			};

			TestUil.getMealId().then((mealId) => {
				request.put({ url: `${baseUrl}/meals/image/${mealId}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});
	});

	describe('Delete Meal', () => {
		before((done) => {
			TestUil.insertMeals(done, true);
		});

		after((done) => {
			TestUil.deleteMeals(done);
		});

		it('should return status (200) and delete meal', (done) => {
			TestUil.getMealId().then((mealId) => {
				request.delete({ url: `${baseUrl}/meals/${mealId}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});
	});
});

