/* eslint func-names: 0, no-unused-expressions: 0 */
const path = require('path');

const imagePath = path.join(__dirname, '../../assets/images/banner.jpg');

const profile = {
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

  'Should navigate to the admin profile page': (client) => {
    client
      .waitForElementVisible('#caterer_dropdown', 10000)
      .moveToElement('#caterer_dropdown', 10, 10)
      .pause(1000)
      .waitForElementVisible('#admin_profile')
      .assert.visible('#admin_profile')
      .waitForElementVisible('#admin_profile')
      .click('#admin_profile')
      .waitForElementVisible('#toggleDropZone')
      .pause(2000)
      .assert.visible('#toggleDropZone');
  },

  'Should show new profile modal form': (client) => {
    client
      .moveToElement('#profile_button', 10, 10)
      .pause(1000)
      .assert.containsText('#profile_button', 'Add Profile')
      .click('#profile_button')
      .pause(1000)
      .waitForElementVisible('.box')
      .assert.visible('.box')
      .pause(2000);
  },

  'Should fill profile form create a business profile': (client) => {
    client
      .pause(1000)
      .setValue('#businessName', 'Five Guys')
      .setValue('#mission', 'Feed all in andela')
      .setValue('#contact', '12 Andela way medium')
      .moveToElement('input[type=submit]', 10, 10)
      .pause(2000)
      .click('input[type=submit]')
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default');
  },

  'Should upload profile photo successfully': (client) => {
    client
      .pause(1000)
      .click('#toggleDropZone')
      .waitForElementVisible('#dropzoneHeader')
      .assert.containsText('#dropzoneHeader', 'Drop Image Here')
      .pause(1000)
      .moveToElement('#upload_image', 10, 10)
      .pause(2000)
      .setValue('input[type=file]', imagePath)
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 30000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default')
      .pause(2000)
      .execute('scrollTo(0, 500)')
      .pause(1000)
      .execute('scrollTo(0, 0)')
      .pause(1000);
  },

  'Should update profile successfully': (client) => {
    client
      .moveToElement('#profile_button', 10, 10)
      .pause(1000)
      .assert.containsText('#profile_button', 'Update Profile')
      .click('#profile_button')
      .pause(1000)
      .clearValue('#mission')
      .setValue('#mission', 'The new mission')
      .moveToElement('input[type=submit]', 10, 10)
      .pause(2000)
      .click('input[type=submit]')
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default')
      .pause(2000);
    client.end();
  },
};

export default profile;
