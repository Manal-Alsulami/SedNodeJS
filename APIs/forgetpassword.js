

const express = require("express");
const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize"); // Import Op from Sequelize
const route = express.Router();
const OTPs = require("../model/otps");
const User = require("../model/User");
const sequelize = require("../db/connection");
const sendEmail = require("../lib/email");
const bcrypt = require("bcrypt");

// Function to generate a random OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}

// Route to check email and generate OTP
route.post(
    "/checkemail",
    [body("email").isEmail().withMessage("Invalid email format")],
    async (req, res) => {
        const { email } = req.body;

        try {
            // Check if email exists
            const existingUser = await User.findOne({ where: { email } });
            if (!existingUser) {
                return res.status(400).json({ error: "Email not found" });
            }

            // Generate OTP
            const otp = generateOTP();

            // Set expiration time (2 minutes from now)
            const expiryTimestamp = new Date();
            expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 2);

            // Save the OTP with expiration time and email to the database
            await OTPs.create({
                user_ID: existingUser.user_ID,
                email,
                OTP_value: otp,
                is_used: false,
                Expiry_timestamp: expiryTimestamp,
            });

            // Send OTP via email
            await sendEmail(
                email,
                "Verify OTP",
                "Please use this OTP to reset your password: " + otp
            );

            return res.status(200).json({ message: "OTP sent successfully" });

            // Send OTP in response
            //   return res.status(200).json({ otp });
        } catch (error) {
            console.error("Error checking email and generating OTP:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
);

// Route to verify OTP and change password
route.post(
    "/changePassword",
    [
        body("email").isEmail().withMessage("Invalid email format"),
        body("otp").isNumeric().withMessage("OTP must be numeric"),
        body("newPassword")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long"),
        body("rewriteNewPassword").custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
    ],
    async (req, res) => {
        const { email, otp, newPassword } = req.body;

        try {
            // Find the OTP record for the given email and OTP value
            const otpRecord = await OTPs.findOne({
                where: {
                    email,
                    OTP_value: otp,
                    is_used: false,
                    Expiry_timestamp: { [Op.gt]: new Date() }, // Check if OTP is not expired
                },
            });

            if (!otpRecord) {
                return res.status(401).json({ error: "Invalid OTP or OTP expired" });
            }
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update user's password
            await User.update({ password: hashedPassword }, { where: { email } });

            // Mark OTP as used
            await otpRecord.update({ is_used: true });

            return res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            console.error("Error verifying OTP and updating password:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
);

module.exports = route;




