
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true,
			},
		},
		passwordHash: DataTypes.STRING,
		fullName: DataTypes.STRING,
		role: DataTypes.STRING,
	}, {});
	User.associate = (models) => {
		User.hasMany(models.meal);
		User.hasMany(models.menu);
		User.hasOne(models.profile);
	};
	return User;
};
