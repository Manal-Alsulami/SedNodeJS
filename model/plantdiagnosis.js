
const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./User'); // Import the User model
// Define PlantDiagnosis model
const PlantDiagnosis = sequelize.define('PlantDiagnosis', {
    PlantDiagnosis_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_ID: Sequelize.INTEGER,
    Image: Sequelize.BLOB,
    PlantResult: Sequelize.TEXT
}, {
    tableName: 'PlantDiagnosis' //table name
});
PlantDiagnosis.belongsTo(User, { foreignKey: 'user_ID' });


module.exports = PlantDiagnosis;