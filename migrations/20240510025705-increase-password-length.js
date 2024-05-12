'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('User', 'password', {
      type: Sequelize.STRING(255), // Increase the length to 255 characters
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('User', 'password', {
      type: Sequelize.STRING(20), // Revert back to the original length
      allowNull: false
    });
  }
};

