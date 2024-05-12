
const express = require('express');
const sequelize = require("./db/connection"); // Import Sequelize instance
const passport = require('./config/passport'); // Import Passport middleware
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const crypto = require('crypto');
require('dotenv').config();


// Create Express app
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Require API route files
const signupAPI = require('./APIs/signup'); // Corrected line
const loginAPI = require('./APIs/login');
const otpsAPI = require('./APIs/otpsAPI');
const profileAPI = require('./APIs/profile'); // Corrected line
const editProfileAPI = require('./APIs/editprofile');
const changePasswordAPI = require('./APIs/changepassword');
const plantTypeAPI = require('./APIs/planttypeAPI');
const selectedPlantTypeAPI = require('./APIs/selectedplanttype');
const planttypeimageAPI = require('./APIs/planttypeimage'); // Import the planttypeimage router
// const planttypeimageAPI = require('./APIs/planttypeimage')(sequelize)
// Use API route files
app.use('/APIs/signup', signupAPI); // Corrected line
app.use('/APIs/login', loginAPI);
app.use('/APIs/otpsAPI', otpsAPI);
app.use('/APIs/profile', profileAPI);
app.use('/APIs/editprofile', editProfileAPI);
app.use('/APIs/changepassword', changePasswordAPI);
app.use('/APIs/planttypeAPI', plantTypeAPI);
app.use('/APIs/selectedplanttype', selectedPlantTypeAPI);
app.use('/APIs/planttypeimage', planttypeimageAPI); // Mount the planttypeimage router

// Start the server
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

// Route to check server status
app.get('/status', (request, response) => {
    const status = {
        'Status': 'Running'
    };

    response.send(status);
});



