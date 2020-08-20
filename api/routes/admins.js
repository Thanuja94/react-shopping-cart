const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const Admin = require('../models/admin');
const validationFunction = require('../helpers/validationFunctions');
const { Validator } = require('node-input-validator');


const SECRET_KEY = "123456789";


router.post("/", async (req, res) => {

    try
    {
        const v = new Validator(req.body, {
            name: 'required',
            email: 'required|email',
            password: 'required'
        });

        const matched = await v.check();

        if (!matched) {
            // res.status = 422;
            // res.body = v.errors;
            return res.status(422).send(v.errors);
        }


        // //add validationFunction
        // if(!validationFunction.validEmail(req.body.email))
        //     return res.status(500).send("Invalid Email");

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
            email:admin.email,
            isActive:admin.isActive
        });


    } catch (e) {
        return res.status(500).send(e.message);
    }

});

router.get('/', async(req, res) => {

    try{
        let admin = await Admin.find({});
        res.send(admin);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.get('/:userId', async(req, res) => {
    try {
        let admin = await Admin.findOne({ _id: req.params.userId }
        );
        res.send(admin);
    } catch (e) {
        res.status(500).send(e.message);
    }
});


router.put('/:userId', async(req, res) => {

    //update first approach
    let admin = await Admin.findOneAndUpdate({ _id: req.params.userId }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isActive: req.body.isActive
            }
        }, { new: true, useFindAndModify: false }

    );
    res.send(await admin.save());

});

module.exports = router;
