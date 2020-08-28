const express = require("express");
const router = express.Router();
const {OAuth2Client} = require("google-auth-library");
const { response } = require("express");
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config/config');

const client = new OAuth2Client("302156694036-4fdehcn3r55dv84nijrtogqbj4movmng.apps.googleusercontent.com");


router.post("/" , async (req, res)=>{
    try{
        let user = await User.findOne( { email: req.body.email });
        if(!user) return res.status(400).send("Invalid email");

        let pwValid = await bcrypt.compare(  req.body.password, user.password);
        if(!pwValid)  return res.status(400).send("invalid Email/ password");

        let token = jwt.sign({ id: user._id , email: user.email }, config.SECRET_KEY);

        return res.send({token: token});

    }
    catch(e){
        res.status(500).send(e.message);
    }
});


router.post('/googlelogin' , async (req, res) => {
    let tokenId = await req.body;
    tokenId=tokenId.data.tokenId

    client.verifyIdToken({idToken: tokenId , audience: "302156694036-4fdehcn3r55dv84nijrtogqbj4movmng.apps.googleusercontent.com"}).then(response =>{
        const {email_verified, name, email} = response.payload;
        console.log(response.payload);
        if (email_verified){
             User.findOne( {email}).exec((err,user) =>{
                 if(err){
                    return res.status(400).send("Something went Wrong");
                 }
                 else{
                     if(user){
                        let token = jwt.sign({ id: user._id , email: user.email }, config.SECRET_KEY);

                        return res.send({token: token});
                     }
                     else{
                        // let salt =  bcrypt.genSalt(10);
                        // let hashedpw =  bcrypt.hash(email+config.SECRET_KEY,salt);
                        let hashedpw = email+config.SECRET_KEY;

                         let newuser = new User({name,email,hashedpw});

                        newuser = newuser.save((err,data)=>{
                             if(err){
                                return res.status(400).send("Something went Wrong");
                             }
                            let token = jwt.sign({ id: data._id , email: data.email }, config.SECRET_KEY);

                            return res.send({token: token});
                         })
                     }
                 }
             });
            
    
        }

    })
});

module.exports = router;