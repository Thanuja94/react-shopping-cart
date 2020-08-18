const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');


router.post("/", async (req, res) => {

    try {
        let admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isActive: req.body.isActive
        });

        admin = await admin.save();
        res.send(admin);
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
