const mongoose = require('mongoose');
const config = require('../config/config');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name field cannot be empty'],
        minlength: 5
    },
    price: {
        type: Number,
        required: [true, 'product price should be included'],
    },
    qty: Number,
    imagePath: String,
    category: {
        type: String,
        enum: config.product_categories
    },
    isActive: {
        type: Boolean,
        required: [true, 'Active Status should be included'],
        default: 1,
    }

});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;