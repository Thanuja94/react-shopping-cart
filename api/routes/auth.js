const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require('../config/config');


const Admin = require("../models/admin");

router.post("/", async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email, isActive: 1 });
        if (!admin) return res.status(400).send("Invalid email /password");

        let pwValid = await bcrypt.compare(req.body.password, admin.password);
        if (!pwValid) return res.status(400).send("Invalid email / password");

        let token = jwt.sign({ id: admin._id, email: admin.email }, config.SECRET_KEY);

        return res.send({ token: token });
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = router;