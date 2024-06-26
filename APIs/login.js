
const express = require("express");
//const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
//const passport = require('passport');
const route = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

// Extract user data from the request body
function extractUserData(req) {
    const { email, password } = req.body;
    return { email, password };
}

async function loginPerform(userData) {
    const { email, password } = userData;

    // Retrieve user from the database by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists
    if (!user) throw new Error("User not found");

    // Compare hashed password with the stored hashed password
    const matched = await bcrypt.compare(password, user.password);

    // It's a best practice not to specify the exact error message. Instead, use a generic message like "Incorrect email or password"
    if (!matched) throw new Error("Incorrect email or password");

    return { success: true, user };
    // Compare password directly (without hashing)
    //   if (password === user.password) {
    //     return { success: true, user };
    //   } else {
    //     throw new Error("Incorrect password");
    //   }
}
//post: to create data

route.post(
    "/",
    [
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    async (req, res) => {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Extract user data from request body
            const userData = extractUserData(req);

            // Perform login
            const loginResult = await loginPerform(userData);

            // If login is successful return success msg and user data
            return res
                .status(200)
                .json({ message: "Login successful", user: loginResult.user });
        } catch (error) {
            // If an error occurs during login (user not found or incorrect password)
            return res.status(401).json({ error: error.message });
        }
    }
);

module.exports = route;




/**
 *  // Create a JWT token
            const token = jwt.sign(
                { userId: loginResult.user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            console.log('Generated token:', token);
 */