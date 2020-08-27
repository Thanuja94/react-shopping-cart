const express = require("express");
const router = express.Router();
const { response } = require("express");



router.post("/userAuth" , async (req, res) => {
    const {tokenId} = await req.body;

    client.verifyIdToken({tokenId , audience: "302156694036-4fdehcn3r55dv84nijrtogqbj4movmng.apps.googleusercontent.com"}).then(response =>{
        const {email_verified, name, email} = response.payload;
        console.log(response.payload);
    })
});

module.exports = router;