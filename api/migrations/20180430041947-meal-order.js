
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('mealOrders', {
			id: {
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			mealId: {
				type: Sequelize.UUID,
				references: {
					model: 'meals',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			orderId: {
				type: Sequelize.UUID,
				references: {
					model: 'orders',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
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
		return queryInterface.dropTable('mealOrders');
	},
};