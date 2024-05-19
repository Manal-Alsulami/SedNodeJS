

const express = require('express');
const { body, validationResult } = require('express-validator');
const route = express.Router();
const OTPs = require('../model/otps');
const sequelize = require('../db/connection');

// Temporary storage for user data
const tempUserData = {};

// Function to generate a random OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}

// Route to handle user signup
route.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email format').custom(async (value) => {
            const existingUser = await User.findOne({ where: { email: value } });
            if (existingUser) {
                throw new Error('Email is already registered');
            }
        }),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
            .notEmpty().withMessage('Password is required')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
            .withMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'),
        body('phone').notEmpty().withMessage('Phone number is required')
    ],
    async (request, response) => {
        // Validate request
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            // Extract user data from request body
            const { name, email, password, phone } = request.body;

            // Generate OTP
            const otp = generateOTP();

            // Set expiration time (e.g., 5 minutes from now)
            const expiryTimestamp = new Date();
            expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 5); // Set expiration to 5 minutes from now

            // Save the OTP with expiration time to the database
            await OTPs.create({
                user_ID: null, // No user ID at this point
                OTP_value: otp,
                is_used: false,
                Expiry_timestamp: expiryTimestamp
            });

            // Store user data temporarily using email as the key
            tempUserData[email] = { name, email, password, phone };

            // Send OTP in response
            return response.status(200).json({ otp, email });
        } catch (error) {
            console.error('Error signing up:', error);
            return response.status(500).json({ message: 'Error signing up!' });
        }
    }
);

module.exports = route;









/**
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
       


        return response.status(201).json({ message: 'User signed up successfully. Please verify your email address.' });
    } catch (error) {
        console.error('Error signing up:', error);
        return response.status(500).json({ message: 'Error signing up' });
    }
});
module.exports = route; 
*/