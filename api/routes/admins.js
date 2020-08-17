const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');


// router.post('/admin', async (req, res) => {

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
// });

module.exports = router;
