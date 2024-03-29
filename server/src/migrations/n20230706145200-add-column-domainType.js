module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Contests', 'domainType', {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Contests', 'domainType');
  },
};
