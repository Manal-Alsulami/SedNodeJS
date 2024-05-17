
const express = require('express');
const route = express.Router();
const OTPs = require('../model/otps');
const User = require('../model/User');
const nodemailer = require('nodemailer');

//create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'SedrahGP@gmail.com',
        pass: 'hlajzjyoufxovowf' // اشيل السبيسز واحدثه كمان في gmail 
    } // hlaj zjyo ufxo vowf
});

// Function to generate and send OTP to user's email
async function sendOTP(email) {
    try {
        // Generate 4 digit OTP
        const otpValue = Math.floor(1000 + Math.random() * 9000);

        // Save the OTP to the database
        await OTPs.create({ email, OTP_value: otpValue, is_used: false });

        // Send the OTP via email
        const mailOptions = {
            from: 's.sedrah2023@gmail.com',
            to: email,
            subject: 'OTP code',
            text: `Your OTP is: ${otpValue}`,
        };
        await transporter.sendMail(mailOptions);
        // Return success response
        return { message: 'OTP sent successfully' };
    } catch (error) {
        console.error('Error sending OTP:', error);
        // Return specific error message
        return { error: 'Failed to send OTP. Please try again later.' };
    }
}

//post: to create data
//otp generate and verification

// Route to handle OTP generation and sending
route.post('/send', async (req, res) => {
    try {
        const { email } = req.body;

        // Send OTP
        const otpResponse = await sendOTP(email);

        if (otpResponse.error) {
            // Error handling for OTP sending failure
            return res.status(500).json({ message: 'Error sending OTP' });
        }

        // Success message after sending OTP
        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ error: 'Error sending OTP' });
    }
});

// Route to handle OTP verification
route.post('/verify', async (req, res) => {
    try {
        const { email, enteredOTP } = req.body;

        // Find the latest OTP record for the user
        const otpRecord = await OTPs.findOne({
            where: {
                email,
                is_used: false
            },
            order: [['createdAt', 'DESC']]
        });

        // If no OTP record found, return error
        if (!otpRecord) {
            return res.status(401).json({ error: 'No OTP found' });
        }

        // Check if entered OTP matches
        if (otpRecord.OTP_value.toString() !== enteredOTP.toString()) {
            return res.status(401).json({ error: 'Incorrect OTP' });
        }

        // Mark OTP as used
        await otpRecord.update({ is_used: true });

        // Create the user in the database (assuming you want to register the user after OTP verification)
        const user = await User.create({ email, is_verified: true });

        return res.status(200).json({ message: 'OTP verified successfully and user registered' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ error: 'Error verifying OTP' });
    }
});

module.exports = route;





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
 * route.post('/', async (req, res) => {
    try {
        const { email} = req.body;

         //generate 4 digit otp 
        const otpValue = Math.floor(1000 + Math.random() * 9000);
        //save the otp to the database
        await OTPs.create({ email: email, OTP_value: otpValue, is_used: false });

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
                email: email,
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
        //const user = await User.findByPk(userId);
        const user = await User.findOne({ where: { email: email } });
        await user.update({ is_verified: true });

        return res.status(200).json({ message: 'OTP verified successfully' }); // 200 respoce code: The request was successful. The response will contain a JSON body.
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ error: 'Error verifying OTP' }); // 500 respoce code: There was an internal error. A stack trace is provided and logged in the FusionAuth log files. The response will be empty.
    }
});

module.exports = route;
 */