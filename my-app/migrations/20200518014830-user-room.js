'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>  {
    return queryInterface.createTable('user-room', {
      username: {
        type: Sequelize.STRING,
      },
      roomID: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user-room');
  }
};