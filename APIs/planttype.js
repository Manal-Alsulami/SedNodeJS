const express = require('express');
const API = express.Router();

module.exports = (db) => {
    API.post('/planttype', (request, response) => {
        // Execute SELECT query to retrieve plant types from 'planttype' table

        db.query('SELECT * FROM planttype', (error, results) => {
            if (error) {
                console.error('Error retrieving plant types:', error);
                response.status(500).json({ message: 'Error retrieving plant types' });
                return;
            }
            response.status(200).json(results);
        });
    });

    return API;
};
