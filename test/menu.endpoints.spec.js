import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before } from 'mocha';

import TestUil from '../testUtil/TestUtil';

const baseUrl = 'http://localhost:3001/api/v1';

let tokenR = '';
let tokenR_2 = '';

const userFormData = {
	email: 'caterer@gmail.com',
	password: 'password',
};

const customerFormData = {
	email: 'customer@gmail.com',
	password: 'password',
};

request.post({ url: `${baseUrl}/auth/signIn`, form: userFormData }, (error, response, body) => {
	const { token } = JSON.parse(body);
	tokenR = token;
});

request.post({ url: `${baseUrl}/auth/signIn`, form: customerFormData }, (error, response, body) => {
	const { token } = JSON.parse(body);
	tokenR_2 = token;
});

describe('Menu Controller', () => {
	describe('GetMenus', () => {
		before((done) => {
			TestUil.insertMenus(done);
		});

		after((done) => {
			TestUil.deleteMenus(done);
		});

		it('should return status (200) and array of size 2 if request is made with auth token', (done) => {
			request.get({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
				expect(response.statusCode).to.equal(200);
				expect(JSON.parse(body)).to.have.lengthOf(2);
				done();
			});
		});

		it('should return status (403) if request is made with customer auth token', (done) => {
			request.get({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${tokenR_2}` } }, (error, response, body) => {
				expect(response.statusCode).to.equal(403);
				done();
			});
		});

		it('should return status (200) if request is made with correct user id', (done) => {
			TestUil.getMenuId().then((id) => {
				request.get({ url: `${baseUrl}/menus/user/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});

		it('should return status (403) if request is made with correct unixTime but wrong token', (done) => {
			request.get({ url: `${baseUrl}/menus/unixTime/1525564800`, headers: { Authorization: `Bearer ${tokenR}jksdfj` } }, (error, response) => {
				expect(response.statusCode).to.equal(403);
				done();
			});
		});

		it('should return status (404) if request is made with wrong user id', (done) => {
			TestUil.getCustomerId().then((id) => {
				request.get({ url: `${baseUrl}/menus/user/${id}sdf`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(404);
					done();
				});
			});
		});

		it('should return status (200) if request is made with correct unixTime', (done) => {
			request.get({ url: `${baseUrl}/menus/unixTime/1525564800`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it('should return status (200) if request is made with correct menu id', (done) => {
			TestUil.getMenuId().then((id) => {
				request.get({ url: `${baseUrl}/menus/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});
	});

	describe('Delete Menu', () => {
		before((done) => {
			TestUil.insertMenus(done);
		});

		after((done) => {
			TestUil.deleteMenus(done);
		});

		it('should return status (200) if delete request is made with correct menu id', (done) => {
			TestUil.getMenuId().then((id) => {
				request.delete({ url: `${baseUrl}/menus/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});
	});

	describe('Post and Put Menu', () => {
		before((done) => {
			TestUil.insertMenus(done);
		});

		after((done) => {
			TestUil.deleteMenus(done);
		});

		it('should return status (400) if form validation fails', (done) => {
			const formData = {
				name: '',
				unixTime: '',
				meals: [

				],
			};

			request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
				expect(response.statusCode).to.equal(400);
				done();
			});
		});

		it('should return status (400) if form validation fails', (done) => {
			const formData = {
				name: '',
				unixTime: '',
				meals: [

				],
			};

			request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
				expect(response.statusCode).to.equal(400);
				done();
			});
		});

		it('should return status (200) if form validation checks out', (done) => {
			TestUil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					name: 'Monday Special',
					unixTime: 1525545800,
					userId: res.id,
					meals: JSON.stringify([
						{
							mealId: res.meal_1_Id,
						},
						{
							mealId: res.meal_2_Id,
						},
					]),
				};

				request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});

		it('should return status (400) if menu already exists', (done) => {
			TestUil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					name: 'Monday Special',
					unixTime: 1525564800,
					userId: res.id,
					meals: JSON.stringify([
						{
							mealId: res.meal_1_Id,
						},
						{
							mealId: res.meal_2_Id,
						},
					]),
				};

				request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});

		it('should return status (200) if form validation checks out for meal update', (done) => {
			TestUil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					name: 'Monday Special',
					unixTime: 1525545800,
					userId: res.id,
					meals: JSON.stringify([
						{
							mealId: res.meal_1_Id,
						},
						{
							mealId: res.meal_2_Id,
						},
					]),
				};

				TestUil.getMenuId().then((menuId) => {
					request.put({ url: `${baseUrl}/menus/${menuId}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response, body) => {
						expect(response.statusCode).to.equal(200);
						done();
					});
				});
			});
		});
	});
});
