
const Sequelize = require('sequelize');
const sequelize = require('../db/connection');


// Define PlantType model
const PlantType = sequelize.define('PlantType', {
    PlantType_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    selected_Plant_Type: {
        type: Sequelize.STRING(30)
    },
    plant_Type_Image: {
        type: Sequelize.BLOB
    },
    plant_types: {
        type: Sequelize.STRING(30)
    }
}, {
    tableName: 'PlantType',  // Specify the table name explicitly
    timestamps: false
});



module.exports = PlantType;

// Sync the PlantType with the database
/** sequelize.sync()
    .then(() => {
        console.log('PlantType synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing PlantType:', error);
    });
*/
