
const express = require('express');
const route = express.Router();
const User = require('../model/User');
const { body, validationResult } = require('express-validator');

// Extract password data from the request body
function extractPasswordData(req) {
    const { currentPassword, newPassword, rewriteNewPassword } = req.body;
    return { currentPassword, newPassword, rewriteNewPassword };
}

// Validation middleware for change password request
const passwordValidation = [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).withMessage('New password must contain at least one numeric digit, one uppercase and lowercase letter'),
    body('rewriteNewPassword').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('Rewrite new password must match the new password');
        }
        return true;
    })
];
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
route.put('/', passwordValidation, async (req, res) => {
    try {
        // Extract password data from request body
        const { currentPassword, newPassword, rewriteNewPassword } = req.body;
        // Extract userId from query parameters
        const userId = req.query.user_ID;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        // Validate required fields
        if (!checkRequiredFields(req.body)) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Change the password for the specified user
        await changePassword({ currentPassword, newPassword, rewriteNewPassword }, userId);

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = route;