const express = require('express');
const route = express.Router();
const { User } = require('../model/user');

// Extract profile data from the request body
function extractProfileData(req) {
    const { phone, email, changePassword } = req.body;
    return { phone, email, changePassword };
}
// check if any profile data is provided
function isProfileDataProvided(profileData) {
    const { phone, email, changePassword } = profileData;
    return phone !== undefined || email !== undefined || changePassword === true;
}
// Update profile information in the database
async function updateProfile(userData, userId) {
    await User.update(userData, { where: { user_ID: userId } });
}

// route.put('/profile',,,,,,,, same endpoint with profile, bc it is same interface
//put: to update data

route.put('/', async (req, res) => {
    try {
        // extract profile data from request body
        const profileData = extractProfileData(req);
        // Check if any profile data is provided
        if (!isProfileDataProvided(profileData)) {
            return res.status(400).json({ message: 'No changes were made!. Please provide new information to update. ' });
        }
        // Update profile information for the logged-in user
        await updateProfile(profileData, req.user.user_ID); // Assuming user_ID is stored in the request

        // Check if change password flag is provided
        if (profileData.changePassword) {
            // navigate to the change password interface
            return res.redirect('/change-password');
        }
        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ error: 'Error updating profile' });
    }
});

module.exports = route;
