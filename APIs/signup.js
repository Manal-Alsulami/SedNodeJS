
const express = require('express');
const route = express.Router();
//const { User } = require('../model/User');
const User = require('../model/User'); // Correct the import statement

//const { OTPs } = require('../model/otps');
//const axios = require('axois');

// Extract user data from the request body
function extractUserData(request) {
    const { name, email, password, phone } = request.body;
    return { name, email, password, phone };
}
// Check if all required fields are provided
function checkRequiredFields(userData) {
    const { name, email, password, phone } = userData;
    return !(!name || !email || !password || !phone);
}
// return response.status(400).json({ message: 'Please provide all required fields: name, email, password, phone, and location' });

// Check if the email is already registered
async function checkEmailAvailability(email) {
    const existingUser = await User.findOne({ where: { email } });
    return !existingUser;
}

//post: to create data
route.post('/', async (request, response) => {
    try {
        // Extract user data from request body
        const userData = extractUserData(request);

        // Log user data
        console.log('User data before validation: ', userData);
        // Validate required fields
        if (!checkRequiredFields(userData)) {
            return response.status(400).json({ message: 'Please provide all required fields: name, email, password, phone' });
        }

        // Check if email is already registered
        if (!await checkEmailAvailability(userData.email)) {
            return response.status(400).json({ message: 'Email is already registered' });
        }

        // Send OTP to the user (implementation depends on your communication channel)

        return response.status(201).json({ message: 'User signed up successfully. Please verify your email address.' });
    } catch (error) {
        console.error('Error signing up:', error);
        return response.status(500).json({ message: 'Error signing up' });
    }
});
module.exports = route;