

const express = require('express');
const route = express.Router();
const User = require('../model/User'); // Import the User model

// Route to get user profile
route.get('/', async (req, res) => {
    try {
        const userId = req.query.user_ID; // Corrected query parameter name
        console.log(userId);
        // Check if userId is not provided
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        // Find user by ID using Sequelize's findOne method
        const user = await User.findOne({ where: { user_ID: userId } });

        if (!user) {
            // If user not found, return 404
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract relevant profile information
        const userProfile = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            location: user.location // Include other properties as needed
        };

        // Return user profile
        res.status(200).json({ profile: userProfile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

module.exports = route;
