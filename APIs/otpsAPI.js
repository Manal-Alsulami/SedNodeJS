
const express = require('express');
const route = express.Router();
const { OTPs } = require('../model/otps');
const { User } = require('../model/user');
const nodemailer = require('nodemailer');

//create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 's.sedrah2023@gmail.com',
        pass: 'Sedrah4$Sedrah'
    }
});


//post: to create data
//otp generate and verification
module.exports = () => {
    route.post('/otp', async (req, res) => {
        try {
            const { userId, email, enteredOTP } = req.body;

            //generate 4 digit otp 
            const otpValue = Math.floor(1000 + Math.random() * 9000);
            //save the otp to the database
            await OTPs.create({ user_ID: userId, OTP_value: otpValue, is_used: false });

            // send the otp via email
            const mailOptions = {
                from: 's.sedrah2023@gmail.com',
                to: email,
                subject: 'OTP code',
                text: 'Your OTP is: ${otpValue}',
            };
            await transporter.sendMail(mailOptions);

            // Find the OTP record based on userId and otpValue
            const otpRecord = await OTPs.findOne({
                where: {
                    user_ID: userId,
                    OTP_value: otpValue,
                    is_used: false
                }
            });

            // if no otp rec found, return error
            if (!otpRecord) {
                return res.status(401).json({ error: 'Invalid OTP' }); // 401 respoce code: You did not supply a valid Authorization header. The header was omitted or your API key was not valid. The response will be empty
            }

            //check the entered otp with the one sent 
            // why .toString? bc the otpvalu and enteredotp are numbers genereated by Math.random(), but when i receive them in req body they are treated as string
            // so i convert them to string to good comparison 
            if (otpValue.toString() !== enteredOTP.toString()) {
                return res.status(401).json({ error: 'Incorrect' })
            }
            //update OTP record to mark it as used
            await otpRecord.update({ is_used: true });

            // Update user record to mark it as verified
            const user = await User.findByPk(userId);
            await user.update({ is_verified: true });

            return res.status(200).json({ message: 'OTP verified successfully' }); // 200 respoce code: The request was successful. The response will contain a JSON body.
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return res.status(500).json({ error: 'Error verifying OTP' }); // 500 respoce code: There was an internal error. A stack trace is provided and logged in the FusionAuth log files. The response will be empty.
        }
    });

    return route;
};




/**
 * 
 * 
const express = require('express');
const route = express.Router();
const { OTPs } = require('../model/otps');
const { User } = require('../model/user');

//post: to create data
module.exports = () => {
    route.post('/otp', async (req, res) => {
        try {
            const { userId, otpValue } = req.body;

            // Find the OTP record based on userId and otpValue
            const otpRecord = await OTPs.findOne({
                where: {
                    user_ID: userId,
                    OTP_value: otpValue,
                    is_used: false
                }
            });

            if (!otpRecord) {
                return res.status(401).json({ error: 'Invalid OTP' }); // 401 respoce code: You did not supply a valid Authorization header. The header was omitted or your API key was not valid. The response will be empty
            }

            //update OTP record to mark it as used
            await otpRecord.update({ is_used: true });

            // Update user record to mark it as verified
            const user = await User.findByPk(userId);
            await user.update({ is_verified: true });

            return res.status(200).json({ message: 'OTP verified successfully' }); // 200 respoce code: The request was successful. The response will contain a JSON body.
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return res.status(500).json({ error: 'Error verifying OTP' }); // 500 respoce code: There was an internal error. A stack trace is provided and logged in the FusionAuth log files. The response will be empty.
        }
    });

    return route;
};

 */












/**
 * 
 * 
module.exports = (db) => {
    route.post('/otp', (request, response) => {
        const { userId, otpValue } = request.body;
        db.query('SELECT * FROM otps WHERE user_ID = ? AND OTP_value = ? AND is_used = 0', [userId, otpValue], (error, results) => {
            if (error) {
                console.error('Error verifying OTP:', error);
                request.status(500).json({ error: 'Error verifying OTP' }); // 500 is response code: There was an internal error. A stack trace is provided and logged in the FusionAuth log files. The response will be empty.
                return;
            }
            if (results.length === 0) {
                request.status(401).json({ error: 'Invalid OTP' }); // 401 is responce code: You did not supply a valid Authorization header. The header was omitted or your API key was not valid. The response will be empty. 
                return;
            }
            db.query('UPDATE otps SET is_used = 1 WHERE OTP_ID = ?', [results[0].OTP_ID], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating OTP status:', updateErr);
                    response.status(500).json({ error: 'Error updating OTP status' }); // 500 is response code: // // // ...
                    return;
                }
                response.status(200).json({ message: 'OTP verified successfully' });  // 200 is response code: The request was successful. The response will contain a JSON body.
            });
        });    });

    return route;
};

// API to handle OTP code submission
//otps post to verify
//API.post('/verify-otp', (request, response) => {
  
//});
 */