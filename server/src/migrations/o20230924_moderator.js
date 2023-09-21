'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query(
        'ALTER TYPE "enum_Users_role" ADD VALUE \'moderator\'',
        {
          transaction: t,
        }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query(
        'ALTER TYPE "enum_Users_role" DROP VALUE \'moderator\'',
        {
          transaction: t,
        }
      );
    });
  },
};
