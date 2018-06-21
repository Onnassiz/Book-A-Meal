
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
    price: DataTypes.INTEGER,
  }, {});
  MenuMeal.associate = () => {};
  return MenuMeal;
};
