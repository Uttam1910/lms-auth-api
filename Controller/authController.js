// controllers/authController.js
// const multer = require('multer');
// const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken'); // For generating JSON Web Tokens

// Function to handle user signup with input validation and password hashing
const signup = async (req, res) => {
    // Extract name, email, password from request body
    const { name, email, password, avatar } = req.body;

    // Validate input data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new user with hashed password
        user = new User({ name, email, password: hashedPassword, avatar });
        await user.save();

        res.status(201).json({ message: 'User signed up successfully', user });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to handle user sign-in
const signin = async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate input data using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user with the given email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }   

      
        // Generate a JSON Web Token (JWT)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token expiration time (e.g., 1 hour)
        });

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000, // Cookie expiration time in milliseconds (e.g., 1 hour)
        secure: process.env.NODE_ENV === 'production' // Ensures the cookie is only sent over HTTPS in production
        });

        res.status(200).json({ message: 'User signed in successfully', token });
    } catch (error) {
        console.error('Error signing in:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


// controllers/authController.js

// Controller function to get user information
const getUserInfo = (req, res) => {
    // Extract user object from request (attached by middleware)
    const { _id, name, email } = req.user;

    res.status(200).json({ userId: _id, name, email });
};


// controllers/authController.js

// Controller function to log out the user
const logout = (req, res) => {
    // Clear the token cookie by setting an empty value with an expired date
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set expiry date to past to immediately expire the cookie
        secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({ message: 'User logged out successfully' });
};




module.exports = {
    signup, signin,  getUserInfo, logout
};
