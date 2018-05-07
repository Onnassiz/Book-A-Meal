'use strict';
const passwordHash = require('password-hash');
const uuidv4 = require('uuid/v4');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('users', [
			{
				id: uuidv4(),
				fullName: 'Caterer',
				email: 'caterer@gmail.com',
				role: 'caterer',
				passwordHash: passwordHash.generate('password'),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				fullName: 'Customer',
				email: 'customer@gmail.com',
				role: 'customer',
				passwordHash: passwordHash.generate('password'),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', null, {});
	},
};