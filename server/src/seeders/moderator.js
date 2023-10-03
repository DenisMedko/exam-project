'use strict';
const bcrypt = require('bcrypt');
const { MODERATOR, SALT_ROUNDS } = require('../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash('moderator@gmail.com', SALT_ROUNDS);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Moderator',
          lastName: 'Moderator',
          displayName: 'Moderator',
          email: 'moderator@gmail.com',
          role: MODERATOR,
          password: passwordHash,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
