
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // to connect mysql with the server 

//app.listen(4444,()=> console.log('listening at 4444')); 
const app = express(); // 
const PORT = process.env.PORT || 4444;

//app.use(express.static('public'));
app.use(bodyParser.json()); // Middleware

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Manal4Manal',
    database: 'Sedrah'
});

// Connect to the database
db.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database!');
    }
});


// Require API route files
const signupAPI = require('./APIs/signup')(db);
const loginAPI = require('./APIs/login')(db);
const plantTypeAPI = require('./APIs/planttype')(db);
const profileAPI = require('./APIs/profile')(db);
const editProfileAPI = require('./APIs/editprofile')(db);
const changePasswordAPI = require('./APIs/changepassword')(db);
const otpsAPI = require('./APIs/otps')(db);
const selectedPlantTypeAPI = require('./APIs/selectedplanttype')(db);
//(db) to invoke the function exported from signup.js with the db connection

// Use API route files
app.use('/APIs/signup', signupAPI);
app.use('/APIs/login', loginAPI);
app.use('/APIs/planttype', plantTypeAPI);
app.use('/APIs/profile', profileAPI);
app.use('/APIs/editprofile', editProfileAPI);
app.use('/APIs/changepassword', changePasswordAPI);
app.use('/APIs/otps', otpsAPI);
app.use('/APIs/selectedplanttype', selectedPlantTypeAPI);


// Close the database connection when the server stops
const server = app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});

server.on('close', () => {
    console.log('Closing database connection...');
    db.end((error) => {
        if (error) {
            console.error('Error closing database connection:', error);
        } else {
            console.log('Database connection closed.');
        }
    });
});
























