const express = require('express');
const API = express.Router();

module.exports = (db) => {
    API.put('/editprofile', (request, response) => {
        // Your login logic here
    });

    return API;
};