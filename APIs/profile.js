

const express = require('express');
const route = express.Router();
const User = require('../model/User'); // Import the User model

// Route to get user profile
route.get('/', async (req, res) => {
    try {
        const userId = req.query.user_ID; // Get userId from the query parameters
        console.log(userId);

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        // find user by ID using Sequelize findOne method
        const user = await User.findOne({ where: { user_ID: userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract relevant profile information
        const userProfile = {
            name: user.name,
            email: user.email,
            phone: user.phone,
        };

        // Return user profile
        res.status(200).json({ profile: userProfile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

module.exports = route;


