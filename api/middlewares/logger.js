const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

 //create a write stream, in append mode, so we don’t overwrite the old logs everytime we write  a new one.  
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'userLogs.log'),{flags: "a"}); 

let getLogger = router.get('/api/products/',async function (req, res, next) {


next(); 
}); 

let getIdLogger = router.get('/api/products/:productId',async function (req, res, next) {
 
next(); 
});

const postLogger = router.post('/api/products/',async function (req, res, next) {
   
  next(); 
});
const putLogger = router.put('/api/products/:productId',async function (req, res, next) {
   
   next(); 
});

const deleteLogger = router.delete('/api/products/:productId',async function (req, res, next) {
   
   next(); 
});

router.use(morgan(':method :url :date :url => :status',{
  interval: '7d', // logs will rotate every week
  stream: accessLogStream  ,
  noColors: true 
})); 

module.exports =  getLogger,getIdLogger,postLogger,putLogger,deleteLogger;
