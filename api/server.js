const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const config = require('./config/config'); // global config file
const cors = require('cors');

const port = process.env.PORT || config.port;

//#region  --routes

var products = require('./routes/products');
var admins = require('./routes/admins');
const logger = require('./middlewares/logger');

//#endregion

var app = express();


//#region - middlewares
app.use(logger);
app.use(cors());
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
   

// logging

//authentication


//#endregion

//#region  -- register routes
app.use('/api', products);
app.use('/api/admin', admins);


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

