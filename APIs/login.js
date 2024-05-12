
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const route = express.Router();
const User = require('../model/User');

// Extract user data from the request body
function extractUserData(req) {
    const { email, password } = req.body;
    return { email, password };
}
// Check if all required fields are provided
function checkRequiredFields(userData) {
    const { email, password } = userData;
    return !(!email || !password);
}

async function loginPerform(userData) {
    const { email, password } = userData;
    // Retrieve user from the database by email
    const user = await User.findOne({ where: { email } });
    // Check if user exists
    if (!user) {
        throw new Error('User not found');
    }

    // Compare password directly (without hashing)
    if (password === user.password) {
        return { success: true, user };
    } else {
        throw new Error('Incorrect password');
    }
}
//post: to create data


route.post('/', async (req, res) => {
    try {
        // Extract user data from request body
        const userData = extractUserData(req);

        // Validate required fields
        if (!checkRequiredFields(userData)) {
            return res.status(400).json({ message: 'Please provide all required fields: email and password!' });
        }

        // Perform login 
        const loginResult = await loginPerform(userData);

        // Create a JWT token
        const token = jwt.sign({ userId: loginResult.user.id }, '341cef0cb02793c112cdd9a6d4680c9dae71fcf8265c3e2c4c2232d0a346331b', { expiresIn: '1h' });

        // If login is successful return success msg and user data
        return res.status(200).json({ message: 'Login successful', user: loginResult.user, token });

    } catch (error) {
        // If an error occurs during login (e.g., user not found or incorrect password), handle it
        return res.status(401).json({ error: error.message });
    }
});

module.exports = route;

