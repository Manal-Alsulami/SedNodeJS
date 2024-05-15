//const { Sequelize } = require('sequelize');
const Sequelize = require('sequelize');

// Initialize Sequelize with your database connection details
// const sequelize = new Sequelize('Sedrah', 'root', 'Manal4Manal', {
const sequelize = new Sequelize('u652187899_Sedrah', 'u652187899_Sedrah', 'Manal4Manal', {
    host: '82.197.83.203', //212.38.94.235
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