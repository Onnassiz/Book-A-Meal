

module.exports = (sequelize, DataTypes) => {
	const Address = sequelize.define('address', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		streetAddress: DataTypes.STRING,
		city: DataTypes.STRING,
		state: DataTypes.STRING,
		userId: DataTypes.UUID,
	}, {});
	Address.associate = (models) => {
		Address.belongsTo(models.user);
	};
	return Address;
};
