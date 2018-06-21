
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('profiles', {
			id: {
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			businessName: {
				type: Sequelize.STRING,
			},
			contact: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			mission: {
				type: Sequelize.STRING,
			},
			banner: {
				type: Sequelize.STRING,
			},
			userId: {
				type: Sequelize.UUID,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
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
		return queryInterface.dropTable('profiles');
	},
};
