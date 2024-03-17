const express = require('express');
const API = express.Router();

module.exports = (db) => {
    API.get('/selectedplanttype', (request, response) => {
        // Your login logic here
    });

    return API;
};