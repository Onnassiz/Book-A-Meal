/* eslint func-names: 0, no-unused-expressions: 0 */

const order = {
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

  'Should navigate to the orders page': (client) => {
    client
      .moveToElement('#user_orders', 10, 10)
      .pause(1000)
      .click('#user_orders')
      .waitForElementVisible('h1')
      .pause(2000)
      .assert.visible('h1')
      .pause(2000);
  },

  'Should show meals in menu': (client) => {
    client
      .waitForElementVisible('.accordion__item')
      .pause(1000)
      .assert.visible('.accordion__item')
      .click('.accordion__item:first-of-type')
      .pause(1000)
      .waitForElementVisible('.order-content')
      .assert.visible('.order-content')
      .pause(1000);
  },

  'Should modify order': (client) => {
    client
      .waitForElementVisible('.ion-ios-compose-outline')
      .pause(1000)
      .assert.visible('.ion-ios-compose-outline')
      .click('.ion-ios-compose-outline')
      .pause(1000)
      .waitForElementVisible('.slide-pane__title')
      .assert.visible('.slide-pane__title')
      .pause(1000)
      .click('#checkout')
      .waitForElementVisible('#telephone')
      .pause(1000)
      .clearValue('#telephone')
      .setValue('#telephone', '081232123121')
      .pause(1000)
      .moveToElement('input[type=submit]', 10, 10)
      .pause(1000)
      .click('input[type=submit]')
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default');
  },
};

export default order;
