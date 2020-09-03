const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Product = require('../models/product');
const {productValidationRules, validate} = require('../middlewares/validator');
const {Validator} = require('node-input-validator');
const {findByIdAndDelete} = require('../models/product');
const jwt = require('jsonwebtoken')

router.get('/products', async (req, res) => {

    try {
        let product = await Product.find({});
        res.status(200).send(product);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/products', async (req, res) => {


    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send({msg: "Access denied. No token"});

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send({msg: "Invalid token. Please login again"});
    }

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

        await file.mv(`../client/public/uploads/${file.name}`, function (err) {
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


router.get('/:productId', async (req, res) => {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send({msg: "Access denied. No token"});

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send({msg: "Invalid token"});
    }


    try {
        let product = await Product.findOne({_id: req.params.productId});
        res.send(product);
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});



router.delete('/:productId', async (req, res) => {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send("Access denied. No token");

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send("Invalid token");
    }

    try {
        let admin = await Product.findOneAndDelete({ _id: req.params.productId });

        if (!admin) {
            return res.status(404).send("The given Id does not exist on our server");
        }

        res.send({msg:"Product Deleted Successfully"});

    } catch (e) {
        res.status(404).send(e);
    }

});


module.exports = router;