
const express = require('express');
const route = express.Router();
const { User } = require('../model/user');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing and comparison

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
    // retrive user from db by email
    const user = await User.findOne({ where: { email } });
    //check if user exists!!
    if (!user) {
        throw new Error('User not found');
    }
    // compar hashed pass with provided pass
    const passMatch = await bcrypt.compare(password, user.password);
    // if marchs 
    if (passMatch) {
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

        // If login is successful return success msg and user data
        return res.status(200).json({ message: 'Login successful', user: loginResult.user });

    } catch (error) {
        // If an error occurs during login (e.g., user not found or incorrect password), handle it
        return res.status(401).json({ error: error.message });
    }
});

module.exports = route;
