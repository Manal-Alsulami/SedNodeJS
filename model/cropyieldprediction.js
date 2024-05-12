// Define CropYieldPrediction model
// Import Sequelize

const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./User'); // Import the User model
const PlantType = require('./planttype'); // Import the PlantType model
const PlantDiagnosis = require('./plantdiagnosis'); // Import the PlantType model


// Define CropYieldPrediction model
const CropYieldPrediction = sequelize.define('CropYieldPrediction', {
    prediction_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PlantDiagnosis_ID: Sequelize.INTEGER,
    user_ID: Sequelize.INTEGER,
    PlantType_ID: Sequelize.INTEGER,
    selected_Plant_Type: Sequelize.STRING(30),
    Temp: Sequelize.FLOAT,
    Humidity: Sequelize.FLOAT,
    Rainfall: Sequelize.FLOAT,
    pH: Sequelize.FLOAT,
    N: Sequelize.FLOAT,
    P: Sequelize.FLOAT,
    K: Sequelize.FLOAT,
    PlantResult: Sequelize.TEXT,
    PredictionResult: Sequelize.TEXT
}, {
    tableName: 'CropYieldPrediction' // Specify the table name explicitly
});


CropYieldPrediction.belongsTo(User, { foreignKey: 'user_ID' });
CropYieldPrediction.belongsTo(PlantType, { foreignKey: 'PlantType_ID' });
CropYieldPrediction.belongsTo(PlantDiagnosis, { foreignKey: 'PlantDiagnosis_ID' });



module.exports = CropYieldPrediction;

// Sync the user with the database
/** sequelize.sync()
    .then(() => {
        console.log('CropYieldPrediction synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing CropYieldPrediction:', error);
    }); */

/** sequelize.sync()
.then(() => {
    console.log('OTPs synchronized with the database');
})
.catch((error) => {
    console.error('Error synchronizing OTPs:', error);
});
*/