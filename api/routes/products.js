const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Product = require('../models/product');

router.get('/product', async(req, res) => {
    res.send(await Product.find({}));
});

router.post('/product', async(req, res) => {

    const file = req.files.file;

    await file.mv(`../client/public/uploads/${file.name}`, function(err) {
        if (err) {
            console.log(err);
            if (!file) res.status(400).send('Image should be uploaded ...');
            res.status(500).send("Error uploading image...");
        }
    });

    let product = new Product({
        name: req.body.productName,
        price: req.body.price,
        qty: req.body.qty,
        category: req.body.category,
        imagePath: file.name,
    });

    res.send(await product.save());

});

module.exports = router;