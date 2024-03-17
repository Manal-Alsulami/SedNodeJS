const express = require('express');
const API = express.Router();

module.exports = (db) => {
    API.get('/profile', (request, response) => {
        // Your login logic here
    });

    return API;
};