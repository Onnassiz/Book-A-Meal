

const passwordHash = require('password-hash');
const uuidv4 = require('uuid/v4');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('users', [
    {
      id: uuidv4(),
      fullName: 'Caterer',
      email: 'caterer@bookmeal.com',
      role: 'caterer',
      passwordHash: passwordHash.generate('password'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      fullName: 'Customer',
      email: 'customer@bookmeal.com',
      role: 'customer',
      passwordHash: passwordHash.generate('password'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
