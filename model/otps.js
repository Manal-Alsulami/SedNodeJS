// Define OTPs model

// Import Sequelize
const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./user'); // Import the User model


// Define User model
const OTPs = sequelize.define('OTPs', {
    OTP_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_ID: Sequelize.INTEGER,
    OTP_value: Sequelize.INTEGER,
    is_used: Sequelize.BOOLEAN,
    Expiry_timestamp: Sequelize.DATE
});

OTPs.belongsTo(User, { foreignKey: 'user_ID' });

module.exports = OTPs;
// Sync the user with the database
/** sequelize.sync()
    .then(() => {
        console.log('User synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing User:', error);
    });
*/

/** 
 * 
 
const OTPs = sequelize.define('OTPs', {
    OTP_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_ID: Sequelize.INTEGER,
    OTP_value: Sequelize.INTEGER,
    is_used: Sequelize.BOOLEAN,
    Expiry_timestamp: Sequelize.DATE
});

sequelize.sync()
    .then(() => {
        console.log('OTPs synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing OTPs:', error);
    });
syncModel();


module.exports = OTPs;   */