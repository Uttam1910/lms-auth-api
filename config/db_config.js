// config/dbConfig.js

const mongoose = require('mongoose');

// Function to establish database connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';
        const options = {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        };

        // Connect to MongoDB
        await mongoose.connect(mongoURI, options);

        // Get the name of the connected database
        const dbName = mongoose.connection.db.databaseName;
        console.log(`MongoDB connected successfully to database: ${dbName}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

