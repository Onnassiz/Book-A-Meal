/* eslint func-names: 0, no-unused-expressions: 0 */

const auth = {
  'Show image slider on home page': (client) => {
    client
      .url('http://localhost:3002/#/')
      .waitForElementVisible('header')
      .execute('scrollTo(0, 500)')
      .pause(2000)
      .execute('scrollTo(0, 1000)')
      .pause(2000)
      .execute('scrollTo(0, 0)')
      .pause(2000)
      .expect.element('#imageSlider').to.be.present;
    client
      .expect.element('.logo').to.be.present;
  },

  'Should navigate to register page when register link is clicked and register a new customer': (client) => {
    client
      .click('#register')
      .pause(2000)
      .assert.containsText('h3', 'Sign Up')
      .setValue('#fullName', 'Ben Onah')
      .setValue('#signUpEmail', 'onnassiz@gmail.com')
      .setValue('#password', 'password')
      .setValue('#confirm_password', 'password')
      .pause(1000)
      .click('.checkbox')
      .pause(2000)
      .click('input[type=submit]')
      .pause(2000)
      .waitForElementVisible('header')
      .assert.visible('#caterer_dropdown')
      .assert.visible('#user_dropdown');
  },

  'Should show user dropdown and sign out user on button click': (client) => {
    client
      .click('#user_dropdown')
      .pause(1000)
      .waitForElementVisible('#signOut')
      .assert.visible('#signOut')
      .moveToElement('#signOut', 10, 10)
      .pause(1000)
      .click('#signOut')
      .waitForElementVisible('header')
      .pause(2000)
      .assert.visible('#imageSlider')
      .pause(2000);
  },

  'Should sign user into the application': (client) => {
    client
      .moveToElement('#login', 10, 10)
      .pause(1000)
      .click('#login')
      .pause(1000)
      .waitForElementVisible('h3')
      .assert.containsText('h3', 'Sign In')
      .setValue('#signInEmail', 'onnassiz@gmail.com')
      .setValue('#signInPassword', 'password')
      .pause(2000)
      .click('input[type=submit]')
      .waitForElementVisible('header')
      .pause(2000)
      .assert.visible('#caterer_dropdown')
      .assert.visible('#user_dropdown');
    client.end();
  },
};

export default auth;

