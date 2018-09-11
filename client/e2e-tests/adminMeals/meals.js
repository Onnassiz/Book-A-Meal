/* eslint func-names: 0, no-unused-expressions: 0 */
const path = require('path');

const imagePath = path.join(__dirname, '../../assets/images/3.jpg');

const meals = {
  'Should sign user into the application': (client) => {
    client
      .url('http://localhost:3002/#/')
      .waitForElementVisible('header')
      .moveToElement('#login', 10, 10)
      .click('#login')
      .waitForElementVisible('h3')
      .assert.containsText('h3', 'Sign In')
      .setValue('#signInEmail', 'onnassiz@gmail.com')
      .setValue('#signInPassword', 'password')
      .click('input[type=submit]')
      .waitForElementVisible('header')
      .assert.visible('#caterer_dropdown')
      .assert.visible('#user_dropdown');
  },

  'Should navigate to the admin meals page': (client) => {
    client
      .moveToElement('#caterer_dropdown', 10, 10)
      .pause(1000)
      .waitForElementVisible('#admin_meals')
      .assert.visible('#admin_meals')
      .click('#admin_meals')
      .waitForElementVisible('#addMeal')
      .pause(2000)
      .assert.visible('#addMeal');
  },

  'Should show new meal modal form': (client) => {
    client
      .moveToElement('#addMeal', 10, 10)
      .pause(1000)
      .assert.containsText('#addMeal', 'Add Meal')
      .click('#addMeal')
      .pause(1000)
      .waitForElementVisible('.box')
      .assert.visible('.box')
      .pause(2000);
  },

  'Should fill meal form and create a new meal': (client) => {
    client
      .pause(1000)
      .setValue('#name', 'Fried Rice')
      .setValue('#price', 2000)
      .setValue('#category', 'Dinner')
      .setValue('#description', 'This is a good meal. It has all you need. Try it out.')
      .moveToElement('input[type=submit]', 10, 10)
      .pause(2000)
      .click('input[type=submit]')
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default');
  },

  'Should show a new meal modal form again': (client) => {
    client
      .moveToElement('#addMeal', 10, 10)
      .assert.containsText('#addMeal', 'Add Meal')
      .click('#addMeal')
      .waitForElementVisible('.box')
      .assert.visible('.box')
      .pause(1000);
  },

  'Should fill another meal form and create a new meal': (client) => {
    client
      .pause(1000)
      .setValue('#name', 'Chicken')
      .setValue('#price', 2000)
      .setValue('#category', 'Dinner')
      .setValue('#description', 'This is a good meal. It has all you need. Try it out.')
      .moveToElement('input[type=submit]', 10, 10)
      .pause(2000)
      .click('input[type=submit]')
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default');
  },

  'Should show a new meal modal form for the third time': (client) => {
    client
      .moveToElement('#addMeal', 10, 10)
      .assert.containsText('#addMeal', 'Add Meal')
      .click('#addMeal')
      .waitForElementVisible('.box')
      .assert.visible('.box')
      .pause(1000);
  },

  'Should fill the third meal form and create a new meal': (client) => {
    client
      .pause(1000)
      .setValue('#name', 'Beans')
      .setValue('#price', 1000)
      .setValue('#category', 'Dinner')
      .setValue('#description', 'This is a good meal for me and you.')
      .moveToElement('input[type=submit]', 10, 10)
      .pause(2000)
      .click('input[type=submit]')
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default');
  },

  'Should show an update meal modal': (client) => {
    client
      .waitForElementVisible('#updateModal:first-of-type')
      .assert.visible('#updateModal:first-of-type')
      .click('#updateModal:first-of-type')
      .assert.visible('.box')
      .pause(1000);
  },

  'Should update the third meal form and update a new meal': (client) => {
    client
      .pause(1000)
      .clearValue('#name')
      .setValue('#name', 'Rice')
      .clearValue('#price')
      .setValue('#price', 1200)
      .moveToElement('input[type=submit]', 10, 10)
      .pause(1000)
      .click('input[type=submit]')
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default');
  },

  'Should show delete modal and delete meal on button click': (client) => {
    client
      .assert.visible('#deleteModal:first-of-type')
      .click('#deleteModal:first-of-type')
      .waitForElementVisible('button.swal-button.swal-button--confirm.swal-button--danger', 10000)
      .pause(1000)
      .click('button.swal-button.swal-button--confirm.swal-button--danger')
      .waitForElementVisible('button.swal-button.swal-button--confirm', 15000)
      .pause(1000)
      .click('button.swal-button.swal-button--confirm')
      .waitForElementNotVisible('button.swal-button.swal-button--confirm', 20000)
      .assert.hidden('button.swal-button.swal-button--confirm')
      .pause(1000);
  },

  'Should show an image upload modal modal': (client) => {
    client
      .assert.visible('#addPhotoModal:first-of-type')
      .click('#addPhotoModal:first-of-type')
      .waitForElementVisible('#dropzoneHeader')
      .assert.containsText('#dropzoneHeader', 'Drop Image Here')
      .pause(1000)
      .moveToElement('#upload_image', 10, 10)
      .pause(1000)
      .setValue('input[type=file]', imagePath)
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 15000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default')
      .pause(1000);
    client.end();
  },
};

export default meals;
