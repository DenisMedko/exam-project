'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      participants: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      blackList: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      favoriteList: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      oldId: {
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
    await queryInterface.dropTable('Conversations');
  },
};
