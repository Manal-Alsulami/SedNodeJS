//const { Sequelize } = require('sequelize');
const Sequelize = require('sequelize');
require('dotenv').config();
// Initialize Sequelize with your database connection details
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Error connecting to MySQL database:', error);
    });

// Export sequelize instance
module.exports = sequelize;