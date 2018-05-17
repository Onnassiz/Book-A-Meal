
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('menuMeals', {
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
			menuId: {
				type: Sequelize.UUID,
				references: {
					model: 'menus',
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

	down: (queryInterface) => {
		return queryInterface.dropTable('menuMeals');
	},
};
