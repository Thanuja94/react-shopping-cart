const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Product = require('../models/product');

router.get('/products', async(req, res) => {

    try {
        let product = await Product.find({});
        res.send(product);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/products/:productId', async(req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.productId } //Products that are match with params id
        );
        res.send(product);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/products/:productId', async(req, res) => {

    const file = req.files.file;

    await file.mv(`../client/public/uploads/${file.name}`, function(err) {
        if (err) {
            console.log(err);
            if (!file) res.status(400).send('Image should be uploaded ...');
            res.status(500).send("Error uploading image...");
        }
    });
    //update first approach   
    let product = await Product.findOneAndUpdate({ _id: req.params.heroId }, {
            $set: {
                name: req.body.productName,
                price: req.body.price,
                qty: req.body.qty,
                category: req.body.category,
                imagePath: file.imagePath
            }
        }, { new: true, useFindAndModify: false }

    );
    res.send(await product.save());

});

router.post('/products', async(req, res) => {

    const file = req.files.file;

    try {

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