'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('meals', {
			id: {
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			price: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			description: {
				type: Sequelize.TEXT,
			},
			category: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			userId: {
				type: Sequelize.UUID,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			imageUrl: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('meals');
	},
};
