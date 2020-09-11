const express = require('express');
const router =express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post("/" , async ( req,res) =>{

    try{

        let salt = await bcrypt.genSalt(10);
        let hashedpw = await bcrypt.hash(req.body.password,salt);

        let user =new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedpw
        });

        user = await user.save();
        return res.send({
            name: user.name,
            email: user.email
        })
    }
    catch(e){
        return res.status(500).send(e.message);
    }
});

module.exports = router;