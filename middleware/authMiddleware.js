// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

// Middleware to authenticate user based on JWT token
const authenticateUser = async (req, res, next) => {
    try {
        // Retrieve token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Authorization failed: Token not found' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user based on decoded userId
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'Authorization failed: User not found' });
        }

        // Attach user object to request for further processing
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error authenticating user:', error.message);
        res.status(401).json({ error: 'Authorization failed: Invalid token' });
    }
};

module.exports = {
    authenticateUser
};
