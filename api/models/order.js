
module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define('order', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		amount: DataTypes.DECIMAL,
	}, {});
	Order.associate = (models) => {
		Order.belongsTo(models.user);
		Order.belongsToMany(models.meal, { through: 'mealOrders' });
	};
	return Order;
};
