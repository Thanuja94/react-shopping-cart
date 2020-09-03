const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const Admin = require('../models/admin');
const validationFunction = require('../helpers/validationFunctions');
const {Validator} = require('node-input-validator');
const config = require('../config/config');

router.post("/", async (req, res) => {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send({msg: "Access denied. No token"});

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send({msg: "Invalid token. Please login again"});
    }

    try {
        const v = new Validator(req.body, {
            name: 'required',
            email: 'required|email',
            password: 'required',
        });

        const matched = await v.check();

        if (!matched) {
            return res.status(422).send(v.errors);
        }

        let salt = await bcrypt.genSalt(10);
        let hashedpw = await bcrypt.hash(req.body.password, salt);

        let admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hashedpw,
            isActive: req.body.isActive
        });

        admin = await admin.save();
        res.send({
            name: admin.name,
            email: admin.email,
            isActive: admin.isActive
        });


    } catch (e) {
        return res.status(500).send({msg: e.message});
    }

});

router.get('/', async (req, res) => {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send({msg: "Access denied. No token"});

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send({msg: "Invalid token"});
    }

    try {
        let admin = await Admin.find({});
        res.send(admin);
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

router.get('/:userId', async (req, res) => {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send({msg: "Access denied. No token"});

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send({msg: "Invalid token"});
    }


    try {
        let admin = await Admin.findOne({_id: req.params.userId}
        );
        res.send(admin);
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});


router.put('/:userId', async (req, res) => {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send("Access denied. No token");

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send("Invalid token");
    }
    try {

        const v = new Validator(req.body, {
            name: 'required',
            email: 'required|email',
            password: 'required',
            isActive: 'required'
        });

        const matched = await v.check();

        if (!matched) {
            return res.status(422).send("Please fill all required fields correctly");
        }

        let salt = await bcrypt.genSalt(10);
        let hashedpw = await bcrypt.hash(req.body.password, salt);

        //update first approach
        let admin = await Admin.findOneAndUpdate({_id: req.params.userId}, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedpw,
                    isActive: req.body.isActive
                }
            }, {new: true, useFindAndModify: false}
        );
        res.send(await admin.save());

    } catch (e) {
        return res.status(500).send({msg: e.message});
    }

});


router.delete('/:adminId', async (req, res) => {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send("Access denied. No token");

    try {
        jwt.verify(token, config.SECRET_KEY);
    } catch (e) {
        res.status(400).send("Invalid token");
    }


    try {
        let admin = await Admin.findOneAndDelete({_id: req.params.adminId});

        if (!admin) {
            return res.status(404).send("The given Id does not exist on our server");
        }

        res.send({msg: "Admin Deleted Successfully"});

    } catch (e) {
        res.status(404).send(e);
    }

});

module.exports = router;
