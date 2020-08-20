const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    

});

const User = mongoose.model("User", userSchema);
module.exports = User;