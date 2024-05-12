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
  password: Sequelize.STRING(225),
  phone: Sequelize.STRING(15),
}, {
  tableName: 'User', // Specify the table name explicitly
  timestamps: false
});


module.exports = User;




// Drop and re-create the table
/** User.sync({ force: true })
  .then(() => {
    console.log('User table dropped and re-created successfully.');
  })
  .catch((error) => {
    console.error('Error dropping and re-creating User table:', error);
  });*/