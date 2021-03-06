
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('mealOrders', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    mealId: {
      type: Sequelize.UUID,
      references: {
        model: 'meals',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    orderId: {
      type: Sequelize.UUID,
      references: {
        model: 'orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    units: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    timestamps: false,
  }),

  down: queryInterface => queryInterface.dropTable('mealOrders'),
};
