const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name field cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'Email should be included'],
    },
    password: {
        type: String,
        required :[true, 'Password should be included'],
    },
    isActive: {
        type: Boolean,
        default:1,
    }

});

const SysUser = mongoose.model("SysUser", userSchema);
module.exports = SysUser;