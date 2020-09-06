const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Order = require('../models/order');
const { productValidationRules, validate } = require('../middlewares/Ordervalidator');
const { Validator } = require('node-input-validator');
const config = require('../config/config');

router.post('/', async(req, res) => {

    try {
        console.log('hit...');
        const validationObj = new Validator(req.body, {
            name: 'required|minLength:5',
            total: 'required|integer',
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

router.put('/clientportal/:orderId',async(req,res)=>{

    try{ 
         //update first approach   
    let order = await Order.findOneAndUpdate({ _id: req.params.orderID }, {
        $set: {
            name: req.body.name,
            total: req.body.total,
            lat: req.body.lat,
            long: req.body.long,
            cartItems:req.body.cartItems,
            email: req.body.email
        }
    }, { new: true, useFindAndModify: false }
    );
    if (!order) res.status(400).send('Order is not found!');
    res.send(await order.save());
}
    catch(e)
    {
        res.status(500).send(e.message);
    }

});
router.get('/clientportal/:orderId',async(req,res)=>{
    try {
        let order = await Order.findOne({ _id: req.params.orderId } //Orders that are match with params id
        );
        if (!order) res.status(400).send('Order ID not found!');
        res.send(order);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/all-orders', async (req, res) => {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send({msg: "Access denied. No token"});

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send({msg: e.message});
    }


    try {
        let orders = await Order.find({});
        res.send(orders);
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

module.exports = router;