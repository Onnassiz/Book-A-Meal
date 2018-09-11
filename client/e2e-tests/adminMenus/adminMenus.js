/* eslint func-names: 0, no-unused-expressions: 0 */
const today = new Date();
const tenDaysLater = new Date();
tenDaysLater.setDate(tenDaysLater.getDate() + 10);

const resolveDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

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

  'Should navigate to the admin profile page': (client) => {
    client
      .moveToElement('#caterer_dropdown', 10, 10)
      .pause(1000)
      .waitForElementVisible('#admin_menus')
      .assert.visible('#admin_menus')
      .click('#admin_menus')
      .waitForElementVisible('#showModal')
      .pause(2000)
      .assert.visible('#showModal');
  },

  'Should show new profile modal form': (client) => {
    client
      .moveToElement('#showModal', 10, 10)
      .pause(1000)
      .assert.containsText('#showModal', 'Add Menu')
      .click('#showModal')
      .waitForElementVisible('.box-menu')
      .assert.visible('.box-menu')
      .pause(2000);
  },

  'Should check two meals, fill menus form and submit menu': (client) => {
    client
      .waitForElementVisible('label.checkbox')
      .pause(1000)
      .assert.visible('label.checkbox')
      .click('label.checkbox:first-of-type')
      .click('label.checkbox:last-of-type')
      .setValue('#startDate', resolveDate(today))
      .setValue('#endDate', resolveDate(tenDaysLater))
      .moveToElement('input[type=submit]', 10, 10)
      .pause(1000)
      .click('input[type=submit]')
      .pause(1000)
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default');
  },

  'Should show meals in menu': (client) => {
    client
      .waitForElementVisible('.accordion__item')
      .pause(1000)
      .assert.visible('.accordion__item')
      .click('.accordion__item:first-of-type')
      .pause(2000)
      .click('.show-meals:first-of-type')
      .pause(1000)
      .waitForElementVisible('.menu_item')
      .assert.visible('.menu_item')
      .pause(1000);
  },

  'Should edit and update menu': (client) => {
    client
      .waitForElementVisible('#show-update')
      .click('#show-update')
      .waitForElementVisible('.box-menu')
      .assert.visible('.box-menu')
      .pause(2000)
      .setValue('#name', 'Best menu ever')
      .moveToElement('input[type=submit]', 10, 10)
      .pause(1000)
      .click('input[type=submit]')
      .pause(1000)
      .waitForElementVisible('div.Toastify__toast.Toastify__toast--default', 5000)
      .assert.visible('div.Toastify__toast.Toastify__toast--default');
  },

  'Should show delete modal and delete menu on button click': (client) => {
    client
      .assert.visible('.accordion__item')
      .click('.accordion__item:first-of-type')
      .pause(2000)
      .click('.button-error:first-of-type')
      .waitForElementVisible('button.swal-button.swal-button--confirm.swal-button--danger', 10000)
      .pause(1000)
      .click('button.swal-button.swal-button--confirm.swal-button--danger')
      .waitForElementVisible('button.swal-button.swal-button--confirm', 15000)
      .pause(1000)
      .click('button.swal-button.swal-button--confirm')
      .waitForElementNotVisible('button.swal-button.swal-button--confirm', 20000)
      .assert.hidden('button.swal-button.swal-button--confirm')
      .pause(1000);
    client.end();
  },
};

export default menus;
