

const express = require('express');
const route = express.Router();
const OTPs = require('../model/otps');
const sequelize = require('../db/connection');

// Route to handle OTP verification
route.post('/verify', async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { enteredOTP, email } = req.body;

        // Find the OTP record for the given email and OTP value
        const otpRecord = await OTPs.findOne({
            where: {
                email,
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
        await otpRecord.update({ is_used: true }, { transaction });

        await transaction.commit();

        // User is verified, return success
        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        await transaction.rollback();
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