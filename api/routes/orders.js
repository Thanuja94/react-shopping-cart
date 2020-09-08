const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const commonFunctions = require('../helpers/commonFunctions');
const Order = require('../models/order');
const { orderValidationRules, validate } = require('../middlewares/orderValidator.js');
const { Validator } = require('node-input-validator');
const config = require('../config/config');

router.post('/',async(req, res) => {

    try {

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

router.put('/clientportal/:orderId',orderValidationRules(), validate ,async(req,res)=>{
 try{
    let order = await Order.findOneAndUpdate({ _id: req.params.orderId }, {
        $set: {
            name : req.body.name,
            total: req.body.total,
            cartItems:req.body.cartItems
        }
        }, { new: true, useFindAndModify: false }

        );
        if (!order) res.status(400).send('Order ID is not found!');
        res.send(await order.save());
    }
    catch(e){
    res.status(500).send(e.message);
    }

});

router.get('/clientportal/:orderId',async(req,res)=>{
    try {
        let order = await Order.findOne({_id: req.params.orderId});        
        res.send(order);
        if(!order){
            res.send("Order ID is not found!");
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
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