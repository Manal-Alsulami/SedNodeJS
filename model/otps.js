

const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./User'); // Import the User model

// Define User model
const OTPs = sequelize.define('OTPs', {
    OTP_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_ID: Sequelize.INTEGER,
    OTP_value: Sequelize.INTEGER,
    is_used: Sequelize.BOOLEAN,
    Expiry_timestamp: Sequelize.DATE
}, {
    tableName: 'OTPs', // Specify the table name explicitly
    timestamps: false // Set timestamps to false to don't want Sequelize to manage createdAt and updatedAt columns

});

OTPs.belongsTo(User, { foreignKey: 'user_ID' });

module.exports = OTPs;

