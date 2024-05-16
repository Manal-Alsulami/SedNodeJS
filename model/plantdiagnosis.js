
const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./User'); // Import the User model
const PlantType = require('./planttype'); // Import the PlantType model
// Define PlantDiagnosis model
const PlantDiagnosis = sequelize.define('PlantDiagnosis', {
    PlantDiagnosis_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_ID: Sequelize.INTEGER,
    PlantType_ID: Sequelize.INTEGER,
    selected_Plant_Type: Sequelize.STRING(30),
    Image: Sequelize.BLOB,
    PlantResult: Sequelize.TEXT
}, {
    tableName: 'PlantDiagnosis' //table name
});
PlantDiagnosis.belongsTo(User, { foreignKey: 'user_ID' });
PlantDiagnosis.belongsTo(PlantType, { foreignKey: 'PlantType_ID' });


module.exports = PlantDiagnosis;