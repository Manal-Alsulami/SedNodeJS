
const express = require('express');
const route = express.Router();
const { PlantType } = require('../model/planttype');

// will fetch all plant types along with their images(icons)
//get: to read data
// req here is the http request 
// and it fetching all plant types without any specific conditions or filters from the client


route.get('/', async (req, res) => {
    try {
        const plantTypes = await PlantType.findAll({ attributes: ['PlantType_ID', 'selected_Plant_Type', 'plant_Type_Image'] });
        return res.json(plantTypes);
    } catch (error) {
        console.error('Error fetching plant type images:', error);
        return res.status(500).json({ error: 'Error fetching plant type images' });
    }
});

module.exports = route;




