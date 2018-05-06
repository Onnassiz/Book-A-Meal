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

describe('Order Controller', () => {
	describe('Get Orders', () => {
		before((done) => {
			TestUil.insertOrders(done);
		});

		after((done) => {
			TestUil.deleteOrders(done);
		});

		it('should return status (200) and array of size 2 if request is made with auth token', (done) => {
			request.get({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
				expect(response.statusCode).to.equal(200);
				expect(JSON.parse(body)).to.have.lengthOf(2);
				done();
			});
		});

		it('should return status (200) if request is made with order id', (done) => {
			TestUil.getOrderId().then((id) => {
				request.get({ url: `${baseUrl}/orders/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
					expect(response.statusCode).to.equal(200);
					expect(typeof JSON.parse(body)).to.equal('object');
					done();
				});
			});
		});

		it('should return status (200) if request is made with caterer id', (done) => {
			TestUil.getUserId().then((id) => {
				request.get({ url: `${baseUrl}/orders/caterer/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});
	});

	describe('Post and Put Orders', () => {
		before((done) => {
			TestUil.insertOrders(done);
		});

		after((done) => {
			TestUil.deleteOrders(done);
		});

		it('should return status (400) if form validation fails', (done) => {
			const formData = {
				amount: 1525,
				userId: '',
				meals: [

				],
			};

			request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
				expect(response.statusCode).to.equal(400);
				done();
			});
		});

		it('should return status (200) if form validation checks out', (done) => {
			TestUil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					amount: 1525,
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

				request.post({ url: `${baseUrl}/orders`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
					expect(response.statusCode).to.equal(200);
					done();
				});
			});
		});

		it('should return status (200) when updating menu with correct validation', (done) => {
			TestUil.getCustomerIdAndMealIds().then((res) => {
				const formData = {
					amount: 1525,
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

				TestUil.getOrderId().then((id) => {
					request.put({ url: `${baseUrl}/orders/${id}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response, body) => {
						expect(response.statusCode).to.equal(200);
						done();
					});
				});
			});
		});
	});
});
