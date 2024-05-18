const express = require('express');
const route = express.Router();
const OTPs = require('../model/otps');
const User = require('../model/User');

// Route to handle OTP verification
route.post('/verify', async (req, res) => {
    try {
        const { enteredOTP } = req.body;

        const otpRecord = await OTPs.findOne({
            where: {
                OTP_value: enteredOTP,
                is_used: false
            },
            order: [['OTP_ID', 'DESC']]
        });

        if (!otpRecord) {
            return res.status(401).json({ error: 'Incorrect OTP' });
        }

        if (otpRecord.Expiry_timestamp < new Date()) {
            return res.status(401).json({ error: 'OTP has expired' });
        }

        await otpRecord.update({ is_used: true });

        const user = await User.findByPk(otpRecord.user_ID);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'OTP verified successfully', user });
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