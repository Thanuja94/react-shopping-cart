const express = require("express");
const router = express.Router();
const {OAuth2Client} = require("google-auth-library");
const { response } = require("express");

const client = new OAuth2Client("302156694036-4fdehcn3r55dv84nijrtogqbj4movmng.apps.googleusercontent.com")

router.post('/googlelogin' , async (req, res) => {
    const {tokenId} = await req.body;

    client.verifyIdToken({idToken: tokenId , audience: "302156694036-4fdehcn3r55dv84nijrtogqbj4movmng.apps.googleusercontent.com"}).then(response =>{
        const {email_verified, name, email} = response.payload;
        console.log(response.payload);
    })
});

module.exports = router;