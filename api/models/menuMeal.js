
module.exports = (sequelize, DataTypes) => {
	const MenuMeal = sequelize.define('menuMeal', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		menuId: DataTypes.STRING,
		mealId: DataTypes.STRING,
	}, {});
	MenuMeal.associate = (models) => {
		
	};
	return MenuMeal;
};