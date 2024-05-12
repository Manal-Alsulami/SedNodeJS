
const express = require('express');
const route = express.Router();
const User = require('../model/User');


// Update profile information in the database
async function updateProfile(profileData, userId) {
    const { email, phone } = profileData;

    const updateData = {};
    if (email) {
        // Validate email format
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!validEmail) {
            throw new Error('Email is in incorrect format');
        }
        updateData.email = email;
    }
    if (phone) {
        updateData.phone = phone;
    }

    // Update the profile information in the database
    await User.update(updateData, { where: { user_ID: userId } });
}

//put: to update data
route.put('/', async (req, res) => {
    try {

        // Get user ID and profile data from request body
        const { user_ID, profileData } = req.body;
        const userId = req.query.user_ID; // Retrieve user ID from query parameter

        // check user ID from the request query parameter
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Check if profile data is provided
        if (!profileData || Object.keys(profileData).length === 0) {
            return res.status(400).json({ error: 'No profile data provided' });
        }

        // Update profile information for the logged-in user
        await updateProfile(profileData, userId);


        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(400).json({ error: error.message });
    }
});

module.exports = route;


/** // check if any profile data is provided
function isProfileDataProvided(profileData) {
    const { phone, email, changePassword } = profileData;
    return phone !== undefined || email !== undefined || changePassword === true;
} */


/**
 *   // Check if change password flag is provided
        if (profileData.changePassword) {
            // navigate to the change password interface
            return res.redirect('/change-password');
        }
 */

//const passport = require('passport'); // Require Passport
//const jwt = require('jsonwebtoken'); // Require JWT

// Middleware to authenticate requests
//const authenticate = passport.authenticate('jwt', { session: false });

// Check if any profile data is provided
//   if (!isProfileDataProvided(profileData)) {
//     return res.status(400).json({ message: 'No changes were made or invalid data provided. Please provide new information to update.' });
//}


/** // Ensure req.user and req.user.user_ID exist
if (!req.user || !req.user.user_ID) {
   return res.status(401).json({ message: 'Unauthorized' });
} */