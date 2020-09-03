const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Product = require('../models/product');
const { productValidationRules, validate } = require('../middlewares/productValidator');
const { Validator } = require('node-input-validator');
const { findByIdAndDelete } = require('../models/product');

router.get('/products', async(req, res) => {

    try {
        let product = await Product.find({});
        res.status(200).send(product);
    } catch (e) {
        res.status(500).send(e.message);
    }
}); 

router.post('/products', async(req, res) => {

    const file = req.files.imagePath;

    try {

        const validationObj = new Validator(req.body, {
            productName: 'required|minLength:5',
            price: 'required|integer',
            qty: 'required|integer',
            category: 'required',
            files: 'object'
        });

        // validate user input
        if (!await validationObj.check()) {
            
            return res.status(422).send(validationObj);
        }

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
    } catch (e) {
        res.status(500).send(e.message);
    }

});

module.exports = router;