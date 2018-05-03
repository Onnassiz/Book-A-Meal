
module.exports = (sequelize, DataTypes) => {
	const Meal = sequelize.define('meal', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		name: DataTypes.STRING,
		price: DataTypes.INTEGER,
		description: DataTypes.TEXT,
		category: DataTypes.STRING,
		imageUrl: DataTypes.STRING,
	}, {});
	Meal.associate = (models) => {
		Meal.belongsTo(models.user);
		Meal.belongsToMany(models.menu, { through: 'menuMeals', unique: true });
		Meal.belongsToMany(models.order, { through: 'mealOrders' });
	};
	return Meal;
};
