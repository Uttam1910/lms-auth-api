// app.js

// Import required modules
const express = require('express');
const router = require('./Routers/authRoutes');
const connectDB = require('./config/db_config');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();




// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
// Mount the authRouter for handling authentication routes
app.use('/auth', router);

// Connect to MongoDB
connectDB();

// Define a sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Learning Management System!');
});


// Accessing environment variables
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;
const debugMode = process.env.DEBUG === 'true'; // Convert string 'true' or 'false' to boolean

// Using environment variables
console.log(`MongoDB URI: ${mongoURI}`);
console.log(`Server is running on port ${port}`);
console.log(`JWT Secret: ${jwtSecret}`);
console.log(`Debug Mode: ${debugMode}`);

// Enable CORS for all origins
app.use(cors());

// Enable CORS for specific origins and options
app.use(cors({
    origin: 'https://example.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Export the Express app instance
module.exports = app;
