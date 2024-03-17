const express = require('express');
const API = express.Router();

module.exports = (db) => {
    API.post('/login', (request, response) => {
        // Your login logic here
    });

    return API;
};