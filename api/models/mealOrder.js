
module.exports = (sequelize, DataTypes) => {
	const MealOrder = sequelize.define('mealOrder', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		orderId: DataTypes.STRING,
		mealId: DataTypes.STRING,
		units: DataTypes.INTEGER,
	}, {});
	MealOrder.associate = () => {};
	return MealOrder;
};
