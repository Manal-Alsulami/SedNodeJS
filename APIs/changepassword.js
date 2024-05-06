const express = require('express');
const route = express.Router();
const { User } = require('../model/User');
const bcrypt = require('bcrypt');


// Extract user data from the request body
function extractPasswordData(req) {
    const { currentPassword, newPassword, rewriteNewPassword } = req.body;
    return { currentPassword, newPassword, rewriteNewPassword };
}

// Check if all required fields are provided
function checkRequiredFields(userData) {
    const { currentPassword, newPassword, rewriteNewPassword } = userData;
    return !(!currentPassword || !newPassword || !rewriteNewPassword);
}

async function changePassword(userData, userId) {
    const { currentPassword, newPassword, rewriteNewPassword } = userData;

    // Retrieve the user from the database
    const user = await User.findOne({ where: { user_ID: userId } });

    // Check if the current password matches the stored password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
        throw new Error('Current password is incorrect');
    }

    // Check if the new password and rewrite new password match
    if (newPassword !== rewriteNewPassword) {
        throw new Error('New password and rewrite new password do not match !! ');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password for the user
    await User.update({ password: hashedPassword }, { where: { user_ID: userId } });
}
//put: to update data

route.put('/', async (req, res) => {
    try {
        // Extract password data from request body
        const passwordData = extractPasswordData(req);
        // Validate required fields
        if (!checkRequiredFields(passwordData)) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        // Change the password for the logged-in user
        await changePassword(passwordData, req.user.user_ID); // Assuming user_ID is stored in the request
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = route;
