
const express = require('express');
const route = express.Router();
const User = require('../model/User');
const verifyToken = require('../middleware/auth'); // Import the JWT middleware

// Extract password data from the request body
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
    if (currentPassword !== user.password) {
        throw new Error('Current password is incorrect');
    }

    // Check if the new password and rewrite new password match
    if (newPassword !== rewriteNewPassword) {
        throw new Error('New password and rewrite new password do not match');
    }

    // Update the password for the user
    await User.update({ password: newPassword }, { where: { user_ID: userId } });
}

// PUT: to change password
route.put('/', verifyToken, async (req, res) => {
    try {

        // Extract password data from request body
        const passwordData = extractPasswordData(req);
        const userId = req.userId; // Get userId from the verified token

        // Validate required fields
        if (!checkRequiredFields(passwordData)) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        // Password validation
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(passwordData.newPassword)) {
            return res.status(400).json({
                message: 'Password must contain at least one numeric digit, one uppercase and lowercase letter, and be at least 8 characters long'
            });
        }

        // Change the password for the logged-in user
        await changePassword(passwordData, userId);

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = route;

