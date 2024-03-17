
const express = require('express');
const API = express.Router();

module.exports = (db) => {
    API.post('/signup', (request, response) => {
        // Extract user data from the request body
        const { name, email, password, phone, location } = request.body;
        //check if all required fields are provided
        if (!name || !email || !password || !phone || !location) {
            return response.status(400).json({ message: 'Please provide all required fields: name, email, password, phone, and location' });
        }
        //check if the email is already registered
        db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                console.error('Error checking email:', error);
                return response.status(500).json({ message: 'Error checking email:' });
            }
            if (results.length > 0) {
                return response.status(400).json({ message: 'Email is already registered' });
            }
            //insert the user data into the database
            const userData = { name, email, password, phone, location };
            db.query('INSERT INTO users SET ?', userData, (error, result) => {
                if (error) {
                    console.error('Error signing up:', error);
                    return response.status(500).json({ message: 'Error signing up' });
                }
                return response.status(200).json({ message: 'User signed up successfully' });
            });
        });
    });

    return API;
};