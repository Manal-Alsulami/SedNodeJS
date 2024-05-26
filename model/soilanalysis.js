
const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./User'); // Import the User model



// Define SoilAnalysis model

const SoilAnalysis = sequelize.define('SoilAnalysis', {
    soilAnalysis_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_ID: Sequelize.INTEGER,
    Image: Sequelize.BLOB,
    SoilResult: Sequelize.TEXT
}, {
    tableName: 'SoilAnalysis' // Specify the table name explicitly
});
SoilAnalysis.belongsTo(User, { foreignKey: 'user_ID' });
//SoilAnalysis.belongsTo(PlantType, { foreignKey: 'PlantType_ID' });


module.exports = SoilAnalysis;


// Sync the SoilAnalysis with the database
/** sequelize.sync()
    .then(() => {
        console.log('SoilAnalysis synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing SoilAnalysis:', error);
    }); */

