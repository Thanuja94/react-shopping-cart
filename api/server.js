const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const config = require('./config/config'); // global config file
const cors = require('cors');

const port = process.env.PORT || config.port;

//#region  --routes

var products = require('./routes/products');
var orders = require('./routes/orders');
var admins = require('./routes/admins');
var auth = require('./routes/auth');
var users = require('./routes/users');
const logger = require('./middlewares/logger');
var userAuth =require('./routes/userAuth');

//#endregion

var app = express();


//#region - middlewares
app.use(cors());
app.use(logger);
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
   

// logging

//authentication


//#endregion

//#region  -- register routes
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/admin', admins);
app.use('/api/admin/auth', auth);
app.use('/api/users', users);
app.use('/api/userAuth',userAuth);


//#endregion

const server = app.listen(port, function() {
    console.log('server spinned up ...');
});

mongoose
    .connect(config.database_cloud, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Db successfully ... "))
    .catch(err => console.log("Ërror has occured while connecting to db : ", err));

//#region -- server and database connection

//#endregion

process.on('uncaughtException', function(error) {
    console.log(error.message);
    // log into logger as well
});

