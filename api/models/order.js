
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {});
  Order.associate = (models) => {
    Order.belongsTo(models.user);
    Order.belongsToMany(models.meal, { through: models.mealOrder });
  };
  return Order;
};
