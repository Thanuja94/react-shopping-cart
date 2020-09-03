const mongoose = require('mongoose');
const config = require('../config/config');

const OrderSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'user name field cannot be empty'],
        minlength: 5
    },
    total: {
        type: Number,
        required: [true, 'cart total should be available'],
    },
   
    lat: {
        type: Number,
        required: [true, 'latitude should be available'],
    },
    long: {
        type: Number,
        required: [true, 'longitude should be available'],
    },
    email: {
        type: String,
        required: [true, 'email field cannot be empty'],
        minlength: 5
    },
    cartItems:[{
        
        category:{
            type: String,
            required: [true,'category must be defined']
        },
        count: {
            type:Number,
            required:true
        },
        currencySymbol:{
            type:String,
            required:[true, 'currency value must be defined']
        },
        id:{
            type:String,
            required: [true,'product id must be included']
        },
        name:{
            type:String,
            required:[true, 'product name must be included']
        },
        price: {
            type:Number,
            required:true
        }
    }]

});

const Order = mongoose.model("Orders", OrderSchema);
module.exports = Order;