
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    businessName: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: DataTypes.STRING,
    mission: DataTypes.STRING,
    banner: DataTypes.STRING,
  }, {});
  Profile.associate = (models) => {
    Profile.belongsTo(models.user);
    // Profile.belongsTo(models.mealOrder);
  };
  return Profile;
};

