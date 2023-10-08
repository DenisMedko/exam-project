'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sender: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      conversation: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Conversations',
          key: '_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      body: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        time: true,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        time: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  },
};
