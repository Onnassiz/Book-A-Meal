
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    expiry: DataTypes.DATE,
  }, {});

  Menu.associate = (models) => {
    Menu.belongsTo(models.user);
    Menu.belongsToMany(models.meal, { through: 'menuMeals' });
  };

  return Menu;
};
