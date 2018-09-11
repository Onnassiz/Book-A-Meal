/* eslint func-names: 0, no-unused-expressions: 0 */

const menus = {
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

  'Should navigate to the menu page': (client) => {
    client
      .moveToElement('#user_menus', 10, 10)
      .pause(1000)
      .click('#user_menus')
      .waitForElementVisible('.dateInput')
      .pause(2000)
      .assert.visible('.dateInput')
      .pause(2000);
  },

  'Should show a modal with more info on a meal': (client) => {
    client
      .waitForElementVisible('.more-button')
      .moveToElement('.more-button:first-of-type', 10, 10)
      .pause(1000)
      .click('.more-button:first-of-type')
      .waitForElementVisible('.swal-button')
      .pause(3000)
      .assert.visible('.swal-button')
      .click('.swal-button')
      .pause(1000);
  },

  'Should add meal to cart when button is clicked': (client) => {
    client
      .waitForElementVisible('.add_button')
      .moveToElement('.add_button:first-of-type', 10, 10)
      .pause(1000)
      .click('.add_button:first-of-type')
      .pause(2000)
      .assert.visible('.dynamic-badge')
      .pause(1000);
  },

  'Should should display cart and checkout order': (client) => {
    client
      .waitForElementVisible('.dynamic-badge')
      .moveToElement('.ion-ios-cart-outline', 10, 10)
      .pause(1000)
      .click('.ion-ios-cart-outline')
      .pause(1000)
      .waitForElementVisible('.slide-pane__title')
      .assert.visible('.slide-pane__title')
      .pause(1000)
      .click('#checkout')
      .waitForElementVisible('#telephone')
      .pause(1000)
      .setValue('#telephone', '08122212121')
      .setValue('#address', '50 Abbey Lane')
      .pause(1000)
      .moveToElement('input[type=submit]', 10, 10)
      .pause(1000)
      .click('input[type=submit]')
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default');
    client.end();
  },
};

export default menus;
