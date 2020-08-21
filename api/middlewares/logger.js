const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
var express = require('express');
var router = express.Router();

const getIdLogger = router.get('/api/products/',async function (req, res, next) {
  const accessLogStream = await fs.createWriteStream(path.join(__dirname, 'userLogs.log'), { flags: 'a' }); // creating a log file for get requests

  router.use(morgan(':id :method :url :date',{
    interval: '7d',
    stream: accessLogStream  
  }));
 
  morgan.token('id', (req) => req.id );//This adds an ID to all requests and saves it using the :id token. 
  req.id = req.params.productId;//reqesting params value

  next(); 
});

const getLogger = router.get('/api/products/:productId',async function (req, res, next) {
  const accessLogStream = await fs.createWriteStream(path.join(__dirname, 'userLogs.log'), { flags: 'a' }); // creating a log file for get requests

  router.use(morgan(':id :method :url :date',{
    interval: '7d',
    stream: accessLogStream  
  }));
 
  morgan.token('id', (req) => req.id );//This adds an ID to all requests and saves it using the :id token. 
  req.id = req.params.productId;//reqesting params value

  next(); 
});

const postLogger = router.post('/api/products/',async function (req, res, next) {
  const accessLogStream = await fs.createWriteStream(path.join(__dirname, 'userLogs.log'), { flags: 'a' }); // creating a log file for get requests

  router.use(morgan(':id :method :url :date',{
    interval: '7d',
    stream: accessLogStream  
  }));
 
  morgan.token('id', (req) => req.id );//This adds an ID to all requests and saves it using the :id token. 
  req.id = req.params.productId;//reqesting params value

  next(); 
});
const putLogger = router.put('/api/products/:productId',async function (req, res, next) {
  const accessLogStream = await fs.createWriteStream(path.join(__dirname, 'userLogs.log'), { flags: 'a' }); // creating a log file for get requests

  router.use(morgan(':id :method :url :date',{
    interval: '7d',
    stream: accessLogStream  
  }));
 
  morgan.token('id', (req) => req.id );//This adds an ID to all requests and saves it using the :id token. 
  req.id = req.params.productId;//reqesting params value

  next(); 
});

module.exports =  getLogger,postLogger,getIdLogger,putLogger;
