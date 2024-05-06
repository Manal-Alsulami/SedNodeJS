//const { Sequelize } = require('sequelize');
const Sequelize = require('sequelize');

// Initialize Sequelize with your database connection details
const sequelize = new Sequelize('Sedrah', 'root', 'Manal4Manal', {
    host: 'localhost',
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