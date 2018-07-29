
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menus', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      expiry: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('menus');
  },
};
