const express = require('express');
const route = express.Router();
const { PlantType } = require('../model/planttype'); // Import the PlantType model
const { validationResult } = require('express-validator');
//will handle the creation of new plant types.

//post: to create data

route.post('/', async (req, res) => {
    try {
        const { selected_Plant_Type, plant_Type_Image, plant_types } = req.body;

        //validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //create new plant type
        const newPlantType = await PlantType.create({ selected_Plant_Type, plant_Type_Image, plant_types });
        return res.status(201).json(newPlantType);
    } catch (error) {
        console.error('Error creating plant type:', error);
        return res.status(500).json({ error: 'Error creating plant type' });
    }
});

module.exports = route;

