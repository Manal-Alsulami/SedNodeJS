const express = require('express');
const API = express.Router();

module.exports = (db) => {
    API.get('/planttypeimage', (request, response) => {
        // Your login logic here
    });

    return API;
};