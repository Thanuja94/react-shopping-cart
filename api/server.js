const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config'); // global config file
const cors = require('cors');

const port = process.env.PORT || config.port;

//#region  --routes

var products = require('./routes/products');

//#endregion

var app = express();

app.use(cors());

//#region - middlewares

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// logging

//authentication


//#endregion

//#region  -- register routes
app.use('/api', products);

//#endregion

const server = app.listen(port, function() {
    console.log('server spinned up ...');
});

process.on('uncaughtException', function(error) {
    console.log(error.message);
    // log into logger as well
});