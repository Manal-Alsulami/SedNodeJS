
const express = require('express');
const sequelize = require("./db/connection"); // Import Sequelize instance
//const crypto = require('crypto');
require('dotenv').config();


// Create Express app
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 2429;

// Require API route files
const signupAPI = require('./APIs/signup').route;
const loginAPI = require('./APIs/login');
const forgetpasswordAPI = require('./APIs/forgetpassword');
const otpsAPI = require('./APIs/otpsAPI');
const profileAPI = require('./APIs/profile');
const editProfileAPI = require('./APIs/editprofile');
const changePasswordAPI = require('./APIs/changepassword');
const plantTypeAPI = require('./APIs/planttypeAPI');
const selectedPlantTypeAPI = require('./APIs/selectedplanttype');
const planttypeimageAPI = require('./APIs/planttypeimage'); // Import the planttypeimage router



// const planttypeimageAPI = require('./APIs/planttypeimage')(sequelize)
// Use API route files
app.use('/APIs/signup', signupAPI);
app.use('/APIs/login', loginAPI);
app.use('/APIs/forgetpassword', forgetpasswordAPI);
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



