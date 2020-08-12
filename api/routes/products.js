const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Product = require('../models/product');

router.get('/', async(req, res) => {
    res.send(await Product.find({}));
});

router.post('/', async(req, res) => {

    const file = req.files.file;

    if (commonFunctions.handleFileUpload(file)) {

        let product = new Product({
            name: req.body.productName,
            price: req.body.price,
            qty: req.body.qty,
            category: req.body.category,
            imagePath: file.name,
        })

        res.send(await product.save());
    } else {
        res.status(500).send("Error uploading image...");
    }


});

module.exports = router;