
module.exports = (sequelize, DataTypes) => {
	const Profile = sequelize.define('profile', {
		businessName: DataTypes.STRING,
		contact: DataTypes.STRING,
		email: DataTypes.STRING,
		mission: DataTypes.STRING,
		banner: DataTypes.STRING,
	}, {});
	Profile.associate = (models) => {
		Profile.belongsTo(models.user);
	};
	return Profile;
};

