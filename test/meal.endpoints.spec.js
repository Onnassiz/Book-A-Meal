// import request from 'request';
// import { expect } from 'chai';
// import { describe, it, after, before } from 'mocha';
// import TestUtil from '../testUtil/TestUtil';

// require('dotenv').config();
// const uuidv4 = require('uuid/v4');

// const baseUrl = 'http://localhost:3009/api/v1';

// let tokenR = '';
// const userFormData = {
//   email: 'caterer@gmail.com',
//   password: 'password',
// };

// request.post({ url: `${baseUrl}/auth/signIn`, form: userFormData }, (error, response, body) => {
//   const { token } = JSON.parse(body);
//   tokenR = token;
// });

// describe('Meal Controller', () => {
//   describe('GetMeals', () => {
//     before((done) => {
//       TestUtil.insertMeals(done, false);
//       TestUtil.insertProfile(done, true);
//     });

//     after((done) => {
//       TestUtil.deleteMeals(done, true);
//     });

//     it('should return unauthorized (401) if request is made without token', (done) => {
//       request.get({ url: `${baseUrl}/meals` }, (error, response) => {
//         expect(response.statusCode).to.equal(401);
//         done();
//       });
//     });

//     it('should return unauthorized (401) if request is made with a wrong token', (done) => {
//       request.get({ url: `${baseUrl}/meals`, headers: { Authorization: 'Bearer wrong' } }, (error, response) => {
//         expect(response.statusCode).to.equal(401);
//         done();
//       });
//     });

//     it('should return Ok (200) with array of size(2) if request is made with valid auth token', (done) => {
//       request.get({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
//         expect(response.statusCode).to.equal(200);
//         expect(JSON.parse(body)).to.have.lengthOf(2);
//         done();
//       });
//     });

//     it('should return Ok (200) with a single meal object if request is made valid ID', (done) => {
//       TestUtil.getMealId().then((id) => {
//         request.get({ url: `${baseUrl}/meals/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
//           expect(response.statusCode).to.equal(200);
//           expect(typeof JSON.parse(body)).to.equal('object');
//           done();
//         });
//       });
//     });

//     it('should return Ok (404) if meal ID is not found', (done) => {
//       request.get({ url: `${baseUrl}/meals/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
//         expect(response.statusCode).to.equal(404);
//         expect(typeof JSON.parse(body)).to.equal('object');
//         done();
//       });
//     });

//     it('should return Ok (200), a user object with a set of meals created by that user if request is made with a user valid ID', (done) => {
//       TestUtil.getUserId().then((id) => {
//         request.get({ url: `${baseUrl}/meals/user/${id}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response, body) => {
//           expect(response.statusCode).to.equal(200);
//           expect(Array.isArray(JSON.parse(body).meals)).to.equal(true);
//           expect(JSON.parse(body).meals).to.have.lengthOf(2);
//           done();
//         });
//       });
//     });
//   });

//   describe('Post and Put Meals', () => {
//     before((done) => {
//       TestUtil.insertMeals(done, true);
//     });

//     after((done) => {
//       TestUtil.deleteMeals(done, true);
//     });

//     it('should return unauthorized (401) if request is made without token', (done) => {
//       TestUtil.getUserId().then((id) => {
//         const formData = {
//           name: 'Fire bons',
//           price: 2000,
//           category: 'Hot meal',
//           userId: id,
//           imageUrl: 'http://bens.com',
//         };
//         request.post({ url: `${baseUrl}/meals`, form: formData }, (error, response) => {
//           expect(response.statusCode).to.equal(401);
//           done();
//         });
//       });
//     });

//     it('should return status (400) when form validation fails', (done) => {
//       const formData = {
//         name: '',
//         price: 2000,
//         category: 'Hot meal',
//         imageUrl: 'http',
//       };
//       request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
//         expect(response.statusCode).to.equal(400);
//         done();
//       });
//     });

//     it('should return status (201) when form validation passes and new meal is created', (done) => {
//       process.env.NODE_ENV = 'dev';
//       const formData = {
//         name: 'Eba and Sweet',
//         price: 2000,
//         category: 'Hot meal',
//         imageUrl: 'http://seri.com',
//       };
//       request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
//         expect(response.statusCode).to.equal(201);
//         done();
//       });
//     });

//     it('should return status (400) when creating a meal that already exists', (done) => {
//       TestUtil.getUserId().then((id) => {
//         const formData = {
//           name: 'Chicken Salad',
//           price: 2000,
//           category: 'Hot meal',
//           userId: id,
//           imageUrl: 'http://seri.com',
//         };
//         request.post({ url: `${baseUrl}/meals`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
//           expect(response.statusCode).to.equal(400);
//           done();
//         });
//       });
//     });

//     it('should return status (200) when modifying meal', (done) => {
//       const formData = {
//         name: 'Eba and Sweet',
//         price: 2000,
//         category: 'Hot meal',
//         imageUrl: 'http://seri.com',
//       };

//       TestUtil.getMealId().then((mealId) => {
//         request.put({ url: `${baseUrl}/meals/${mealId}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
//           expect(response.statusCode).to.equal(200);
//           done();
//         });
//       });
//     });

//     it('should return status (404) when modifying meal but meal is not found', (done) => {
//       const formData = {
//         name: 'Eba and Sweet',
//         price: 2000,
//         category: 'Hot meal',
//         imageUrl: 'http://seri.com',
//       };

//       request.put({ url: `${baseUrl}/meals/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
//         expect(response.statusCode).to.equal(404);
//         done();
//       });
//     });

//     it('should return status (400) when wrong image url is used', (done) => {
//       const formData = {
//         imageUrl: 'wrongUrl',
//       };

//       TestUtil.getMealId().then((mealId) => {
//         request.put({ url: `${baseUrl}/meals/image/${mealId}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
//           expect(response.statusCode).to.equal(400);
//           done();
//         });
//       });
//     });

//     it('should return status (200) when correct image url is used', (done) => {
//       const formData = {
//         imageUrl: 'http://correct.url',
//       };

//       TestUtil.getMealId().then((mealId) => {
//         request.put({ url: `${baseUrl}/meals/image/${mealId}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
//           expect(response.statusCode).to.equal(200);
//           done();
//         });
//       });
//     });

//     it('should return status (404) when correct image url is used', (done) => {
//       const formData = {
//         imageUrl: 'http://correct.url',
//       };

//       request.put({ url: `${baseUrl}/meals/image/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` }, form: formData }, (error, response) => {
//         expect(response.statusCode).to.equal(404);
//         done();
//       });
//     });
//   });

//   describe('Delete Meal', () => {
//     before((done) => {
//       TestUtil.insertMeals(done, true);
//     });

//     after((done) => {
//       TestUtil.deleteMeals(done, true);
//     });

//     it('should return status (404) and delete meal', (done) => {
//       request.delete({ url: `${baseUrl}/meals/${uuidv4()}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
//         expect(response.statusCode).to.equal(404);
//         done();
//       });
//     });

//     it('should return status (200) and delete meal', (done) => {
//       TestUtil.getMealId().then((mealId) => {
//         request.delete({ url: `${baseUrl}/meals/${mealId}`, headers: { Authorization: `Bearer ${tokenR}` } }, (error, response) => {
//           expect(response.statusCode).to.equal(200);
//           done();
//         });
//       });
//     });
//   });
// });

