

// routes/authRouter.js

const express = require('express');
const { body } = require('express-validator');
const authController = require('../Controller/authController');
const User = require('../models/UserSchema');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST route for user signup with input validation middleware
router.post(
    '/signup',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email format')
            .custom(async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error('Email already exists');
                }
                return true;
            }),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
    ],
    authController.signup
);

// POST route for user sign-in
router.post(
    '/signin',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    authController.signin
);



// GET route for fetching user information (protected)
router.get('/user', authMiddleware.authenticateUser, authController.getUserInfo);

// POST route for user logout
router.post('/logout', authMiddleware.authenticateUser, authController.logout);

module.exports = router;
