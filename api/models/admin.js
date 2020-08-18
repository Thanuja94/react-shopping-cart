const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name field cannot be empty']
    },
    email: {
        type: String,
        unique: [true, 'Email already registered'],
        required: [true, 'Email should be included'],
    },
    password: {
        type: String,
        required: [true, 'Password should be included'],
    },
    isActive: {
        type: Boolean,
        default: 1,
    }

});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;