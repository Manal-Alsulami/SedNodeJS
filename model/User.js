const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

// Define User model
const User = sequelize.define('User', {
  user_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(30),
  email: Sequelize.STRING(40),
  password: Sequelize.STRING(20),
  phone: Sequelize.STRING(15)
}, {
  tableName: 'user' // Specify the table name explicitly
});

module.exports = User;
