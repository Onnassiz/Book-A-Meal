import request from 'request';
import { expect } from 'chai';
import { describe, it, after, before } from 'mocha';
import TestUtil from '../testUtil/TestUtil';

const uuidv4 = require('uuid/v4');

const baseUrl = 'http://localhost:3001/api/v1';

let tokenR = '';
let tokenR2 = '';

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
	tokenR2 = token;
});

describe('Menu Controller', () => {
	describe('GetMenus', () => {
		before((done) => {
			TestUtil.insertMenus(done);
		});

		after((done) => {
			TestUtil.deleteMenus(done);
		});

		it('should return status (200) and array of size 2 if request is made with auth token', (done) => {
			request.get({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
				expect(response.statusCode).to.equal(200);
				expect(JSON.parse(body)).to.have.lengthOf(2);
				done();
			});
		});

		it('should return status (401) and unauthorized if request is made with customer auth token', (done) => {
			request.get({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${tokenR2}` } }, (error, response) => {
				expect(response.statusCode).to.equal(401);
				done();
			});
		});

		it('should return status (200) if request is made with correct user id', (done) => {
			TestUtil.getUserId().then((id) => {
				request.get({ url: `${baseUrl}/menus/user/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});

		it('should return status (404) if user id does not exist', (done) => {
			request.get({ url: `${baseUrl}/menus/user/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
				expect(response.statusCode).to.equal(404);
				done();
			});
		});

		it('should return status (401) if request is made with correct unixTime but wrong token', (done) => {
			request.get({ url: `${baseUrl}/menus/unixTime/1525564800`, headers: { Authorization: `Bearer ${tokenR}wrong` } }, (error, response) => {
				expect(response.statusCode).to.equal(401);
				done();
			});
		});

		it('should return status (400) if request is made with wrong user id', (done) => {
			TestUtil.getCustomerId().then((id) => {
				request.get({ url: `${baseUrl}/menus/user/${id}sdf`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});

		it('should return status (404) if unixTime is not found', (done) => {
			request.get({ url: `${baseUrl}/menus/unixTime/1525599822`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
				expect(response.statusCode).to.equal(404);
				done();
			});
		});

		it('should return status (200) if request is made with correct unixTime', (done) => {
			request.get({ url: `${baseUrl}/menus/unixTime/1525564800`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it('should return status (200) if request is made with correct menu id', (done) => {
			TestUtil.getMenuId().then((id) => {
				request.get({ url: `${baseUrl}/menus/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});

		it('should return status (404) if request is made with wrong menu id', (done) => {
			request.get({ url: `${baseUrl}/menus/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
				expect(response.statusCode).to.equal(404);
				done();
			});
		});
	});

	describe('Delete Menu', () => {
		before((done) => {
			TestUtil.insertMenus(done);
		});

		after((done) => {
			TestUtil.deleteMenus(done);
		});

		it('should return status (200) if delete request is made with correct menu id', (done) => {
			TestUtil.getMenuId().then((id) => {
				request.delete({ url: `${baseUrl}/menus/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});
	});

	describe('Post and Put Menu', () => {
		before((done) => {
			TestUtil.insertMenus(done);
		});

		after((done) => {
			TestUtil.deleteMenus(done);
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

		it('should return status (400) if UUID validation fails on meal id', (done) => {
			const formData = {
				name: '',
				unixTime: 12312132123,
				meals: [
					{
						mealId: 'wrongId',
					},
				],
			};

			request.post({ url: `${baseUrl}/menus`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
				expect(response.statusCode).to.equal(400);
				done();
			});
		});

		it('should return status (201) if form validation passes and new menu is created', (done) => {
			TestUtil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					name: 'Monday Special',
					unixTime: 1525545800,
					meals: [
						{
							mealId: res.meal_1_Id,
						},
						{
							mealId: res.meal_2_Id,
						},
					],
				};

				const header = {
					Authorization: `Bearer ${tokenR}`,
				};

				request.post({ url: `${baseUrl}/menus`, headers: header, json: formData }, (error, response, body) => {
					expect(response.statusCode).to.equal(201);
					expect(body.menu.name).to.equal('Monday Special');
					done();
				});
			});
		});

		it('should return status (400) if meal Id is missing in any of the meal entries', (done) => {
			TestUtil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					name: 'Monday Special',
					unixTime: 1525545800,
					meals: [
						{},
						{
							mealId: res.meal_2_Id,
						},
					],
				};

				const header = {
					Authorization: `Bearer ${tokenR}`,
				};

				request.post({ url: `${baseUrl}/menus`, headers: header, json: formData }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});

		it('should return status (400) if menu has been created for a particular day', (done) => {
			TestUtil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					name: 'Monday Special',
					unixTime: 1525651200,
					meals: [
						{
							mealId: res.meal_1_Id,
						},
						{
							mealId: res.meal_2_Id,
						},
					],
				};

				const header = {
					Authorization: `Bearer ${tokenR}`,
				};

				request.post({ url: `${baseUrl}/menus`, headers: header, json: formData }, (error, response) => {
					expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});

		it('should return status (400) if user already created menu for a specified date', (done) => {
			TestUtil.getCustomerIdAndMealIds().then((res) => {
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

		it('should return status (200) when updating a menu with passed form validation', (done) => {
			TestUtil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					name: 'Monday Special',
					unixTime: 1525545800,
					meals: [
						{
							mealId: res.meal_1_Id,
						},
						{
							mealId: res.meal_2_Id,
						},
					],
				};

				TestUtil.getMenuId().then((menuId) => {
					request.put({ url: `${baseUrl}/menus/${menuId}`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
						expect(response.statusCode).to.equal(200);
						done();
					});
				});
			});
		});

		it('should return status (404) when updating a menu with wrong meal ID', (done) => {
			TestUtil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					name: 'Monday Special',
					unixTime: 1525545800,
					meals: [
						{
							mealId: res.meal_1_Id,
						},
						{
							mealId: res.meal_2_Id,
						},
					],
				};

				request.put({ url: `${baseUrl}/menus/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` }, json: formData }, (error, response) => {
					expect(response.statusCode).to.equal(404);
					done();
				});
			});
		});
	});
});
