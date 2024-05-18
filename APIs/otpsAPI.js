

const express = require('express');
const route = express.Router();
const OTPs = require('../model/otps');
const User = require('../model/User');

// Route to handle OTP verification
route.post('/verify', async (req, res) => {
    try {
        const { enteredOTP } = req.body;

        // Find the latest OTP record for the user
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

        // Check if OTP is expired
        if (otpRecord.Expiry_timestamp < new Date()) {
            return res.status(401).json({ error: 'OTP has expired' });
        }

        // Mark OTP as used
        await otpRecord.update({ is_used: true });

        // Retrieve user data associated with the OTP
        const user = await User.findByPk(otpRecord.user_ID);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // User is verified, return success
        return res.status(200).json({ message: 'OTP verified successfully', userData: user });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ error: 'Error verifying OTP' });
    }
});

module.exports = route;






/**
 * try {
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

 */