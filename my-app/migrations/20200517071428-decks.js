'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deck', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      suit: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('games');
  }
};