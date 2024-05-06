const express = require('express');
const route = express.Router();
const { PlantType } = require('../model/planttype');
// will fetch all plant types along with their names
//get: to read data



route.get('/', async (req, res) => {
    try {
        //retrive all plant types from db
        const plantTypes = await PlantType.findAll({ attributes: ['PlantType_ID', 'selected_Plant_Type'] });
        return res.json(plantTypes);
    } catch (error) {
        console.error('Error fetching selected plant types', error);
        return res.status(500).json({ error: 'Error fetching selected plant types' });
    }
});
module.exports = route;

//return route;

