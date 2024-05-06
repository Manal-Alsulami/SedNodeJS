const express = require('express');
const route = express.Router();
const { User } = require('../model/User');
//const { OTPs } = require('../model/otps');
//const axios = require('axois');

// route.post('/signup', async (request, response) => {

// Extract user data from the request body
function extractUserData(request) {
    const { name, email, password, phone, location } = request.body;
    return { name, email, password, phone, location };
}
// Check if all required fields are provided
function checkRequiredFields(userData) {
    const { name, email, password, phone, location } = userData;
    return !(!name || !email || !password || !phone || !location);
}
// return response.status(400).json({ message: 'Please provide all required fields: name, email, password, phone, and location' });

// Check if the email is already registered
async function checkEmailAvailability(email) {
    const existingUser = await User.findOne({ where: { email } });
    return !existingUser;
}

/**
 * 
//insert the user data into the database
async function insertUserDataIntoDB(userData) {
    await User.create(userData);
}
*/

//save user data temporary 
/**async function saveUserDataTemporarily(userData) {
    await User.create(userData);
}*/

//generate otp and save it in the db
/** async function generateAndSaveOTP(userID, otpValue) {
    await OTPs.create({ user_ID: userID, OTP_value: otpValue });
} */

//post: to create data
//module.exports = function () {

route.post('/', async (request, response) => {
    try {
        // Extract user data from request body
        const userData = extractUserData(request);

        // Validate required fields
        if (!checkRequiredFields(userData)) {
            return response.status(400).json({ message: 'Please provide all required fields: name, email, password, phone, and location' });
        }

        // Check if email is already registered
        if (!await checkEmailAvailability(userData.email)) {
            return response.status(400).json({ message: 'Email is already registered' });
        }

        //save user data temporarily
        // await saveUserDataTemporarily(userData);
        // const newUser = await saveUserDataTemporarily(userData);
        //cal otpAPI


        // Send OTP to the user (implementation depends on your communication channel)

        return response.status(201).json({ message: 'User signed up successfully. Please verify your email address.' });
    } catch (error) {
        console.error('Error signing up:', error);
        return response.status(500).json({ message: 'Error signing up' });
    }
});
module.exports = route;
// return route;


/**
 *
 
// Insert user data into the database
await insertUserDataIntoDB(userData);

return res.status(201).json({ message: 'User signed up successfully' });
} catch (error) {
console.error('Error signing up:', error);
return res.status(500).json({ message: 'Error signing up' });
}
});

return route;
};

*/

























/**
 * 
 * 
 
module.exports = function (db) {
    // route.post('/signup', (request, response) => {
    // Extract user data from the request body
    function extractUserData(request) {
        const { name, email, password, phone, location } = request.body;
        return { name, email, password, phone, location };
    }
    //check if all required fields are provided
    function checkRquiredFields(userData) {
        const { name, email, password, phone, location } = userData;
        if (!name || !email || !password || !phone || !location) {
            return false;
        }
        return true;
    }
    // return response.status(400).json({ message: 'Please provide all required fields: name, email, password, phone, and location' });

    //check if the email is already registered
    function checkEmailAvailability(email, callback) {
        db.query('SELECT * FROM users WHERE email = ?', [email], function (error, results) {
            if (error) {
                console.error('Error checking email:', error);
                return callback(error, null);
                //return response.status(500).json({ message: 'Error checking email:' });
            }
            if (results.length > 0) {
                return callback(null, false) // email nit available
                //  return response.status(400).json({ message: 'Email is already registered' });
            }
            return callback(null, true) // email  available
        });

    }
    //insert the user data into the database
    function insertUserDataIntoSQL(userData, callback) {
        db.query('INSERT INTO users SET ?', userData, function (error, result) {
            if (error) {
                console.error('Error signing up:', error);
                return callback(error, null);
                //  return response.status(500).json({ message: 'Error signing up' });
            }
            return callback(null, true); // used signed up successfully
        });

    }
    // const userData = { name, email, password, phone, location };

    //   return response.status(200).json({ message: 'User signed up successfully' });

    // route for user signup
    route.post('/signup', function (request, response) {
        const userData = extractUserDataFromBody(request);
        if (!checkRequiredFields(userData)) {
            return response.status(400).json({ message: 'Please provide all required fields: name, email, password, phone, and location' });
        }
        checkEmailAvailability(userData.email, function (error, available) {
            if (error) {
                return response.status(500).json({ message: 'Error checking email:' });
            }
            if (!available) {
                return response.status(400).json({ message: 'Email is already registered' });
            }
            insertUserDataIntoDB(userData, function (error, success) {
                if (error) {
                    return response.status(500).json({ message: 'Error signing up' });
                }
                return response.status(200).json({ message: 'User signed up successfully' });
            });
        });
    });

    return route;
};  */