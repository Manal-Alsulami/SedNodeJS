const express = require('express');
const API = express.Router();

module.exports = (db) => {
    API.put('/changepassword', (request, response) => {
        // Your login logic here
    });

    return API;
};