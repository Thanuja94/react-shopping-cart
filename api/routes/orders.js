const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Order = require('../models/order');
const { productValidationRules, validate } = require('../middlewares/validator');
const { Validator } = require('node-input-validator');

router.post('/orders', async(req, res) => {

    try {

        console.log('hit...');
        const validationObj = new Validator(req.body, {

            name: 'required|minLength:5',
            total: 'required|integer',
            address: 'required',
            lat: 'required',
            long: 'required'
        });

        // validate user input
        if (!await validationObj.check()) {
     
            return res.status(422).send(validationObj.message);
        }

        let order = new Order({
            name: req.body.name,
            total: req.body.total,
            address: req.body.address,
            lat: req.body.lat,
            long: req.body.long,
            cartItems:req.body.cartItems,
            email: req.body.email
        });

        res.send(await order.save());
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }

});

module.exports = router;