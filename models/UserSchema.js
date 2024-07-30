const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define user schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    forgotPassword: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
        default: null
    },
    forgotPasswordExpires: {
        type: Date,
        default: null
    },
    avatar: {
        type: String, // Store URL or file path to avatar image
        default: 'default_avatar.jpg' // Default avatar image
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

// Create and export User model based on schema
module.exports = mongoose.model('User', UserSchema);
